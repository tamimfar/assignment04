import { prisma } from "../../lib/prisma";
import config from "../../config";
import Stripe from 'stripe';



const stripe = new Stripe(process.env.PAYMENT_SECRET!);

const createPayment = async (rentalRequestId: string) => {


    const sessionUrl = await prisma.$transaction(async (tx) => {
        const rentalRequest = await tx.rental.findUniqueOrThrow({
            where: { id: rentalRequestId }, include: {

                user: true,
                propertie: {
                    include: {
                        categorie: true
                    }
                }


            }

        });

        if (rentalRequest.status !== "APPROVED") {
            throw new Error("Rental Request is not approved yet");
        }

        let stripeCustomerId: string;


        const existingCustomers = await stripe.customers.list({
            email: rentalRequest.user.email,
            limit: 1
        });

        if (existingCustomers.data.length > 0) {

            stripeCustomerId = existingCustomers.data[0]!.id;
        } else {

            const customer = await stripe.customers.create({
                email: rentalRequest.user.email,
                name: rentalRequest.user.name,
                metadata: { userId: rentalRequest.user.id }
            });
            stripeCustomerId = customer.id;


        }


        // const session = await stripe.checkout.sessions.create({
        //     line_items: [
        //         {
        //             price: "price_1TquhBJthfsAPlgmG8oVQZiZ", // আপনার স্ট্রাইপ প্রোডাক্টের প্রাইস আইডি
        //             quantity: 1
        //         }
        //     ],
        //     mode: "subscription",
        //     customer: stripeCustomerId, // এখন এটি একটি বৈধ 'cus_...' আইডি
        //     payment_method_types: ["card"],
        //     success_url: "http://localhost:3000/success",
        //     cancel_url: "http://localhost:3000/cancel",
        //     metadata: { userId: user.id }
        // });
        const session = await stripe.checkout.sessions.create({

            mode: "payment",


            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: rentalRequest.propertie.categorie.name,
                        },
                        unit_amount: rentalRequest.propertie.price * 100,
                    },
                    quantity: 1,
                },
            ],
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",

            metadata: {
                userId: rentalRequest.user.id,
                rentalRequestId: rentalRequestId
            }
        });

        return session.url;
    });

    return sessionUrl

}

const paymentConfarmation = async (transactionId: string) => {




    const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
    let updatedPayment;
    if (paymentIntent.status === 'succeeded') {

        updatedPayment = await prisma.payment.update({
            where: { transactionId: transactionId },
            data: { status: 'COMPLETED' }
        });


        await prisma.rental.update({
            where: { id: updatedPayment.rentalRequestId },
            data: { approvedDate: new Date() }
        });


    } else {
        updatedPayment = await prisma.payment.update({
            where: { transactionId: transactionId },
            data: { status: 'CANCELLED' }
        });
    }
    return updatedPayment

}

const getMyaAllPayment = async (userId: string) => {
    const payments = await prisma.payment.findMany({
        where: { userId: userId },
        include: {
            rentalRequest: {
                include: { propertie: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return payments
}

const singlePayment = async (paymentId: string) => {
    const payment = await prisma.payment.findUnique({
        where: { id: paymentId as string },
        include: {
            user: { select: { name: true, email: true } },
            rentalRequest: true
        }
    });

    return payment
}

const paymentService = {
    createPayment,
    paymentConfarmation,
    getMyaAllPayment,
    singlePayment
}

export default paymentService