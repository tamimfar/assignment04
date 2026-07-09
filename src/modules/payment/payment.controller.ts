import { Request, Response } from 'express';
import { prisma } from "../../lib/prisma";
import config from "../../config";
import Stripe from 'stripe';

import { catchAsync } from '../../utils/catchAsync';
import paymentService from './payment.service';
import { sendResponse } from '../../utils/sendResponse';


const stripe = new Stripe(process.env.PAYMENT_SECRET!);


export const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { rentalId } = req.body;
    const paymentIntent = await paymentService.createPayment(rentalId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "payment intent created successfully",
        data: paymentIntent
    })
})




const endpointSecret = config.STRIPE_WEBHOOK_SECRET;
export const heandelWebhook = async (req: Request, res: Response) => {

    let event = req.body;


    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature']!;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (err: any) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return res.sendStatus(400);
        }
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as any;


            const transactionId = session.payment_intent;
            const amount = session.amount_total / 100;
            const currency = session.currency.toUpperCase();



            const userId = session.metadata?.userId;
            const rentalRequestId = session.metadata?.rentalRequestId;

            try {

                const newPayment = await prisma.payment.create({
                    data: {
                        amount: amount,
                        currency: currency,
                        status: 'PENDING',
                        transactionId: transactionId,
                        gateway: "STRIPE",
                        userId: userId,
                        rentalRequestId: rentalRequestId
                    }
                });

                console.log('Payment saved successfully:', newPayment);
            } catch (error) {
                console.error('Error saving payment to database:', error);
            }

            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
            break;
    }


    res.send();
}

export const confirmPayment = catchAsync(async (req: Request, res: Response) => {
    const { transactionId } = req.body;
    const payment = await paymentService.paymentConfarmation(transactionId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "payment intent created successfully",
        data: payment
    })
})


export const getMyPaymentHistory = catchAsync(async (req: Request, res: Response) => {
    const id = req.user?.id as string
    const payments = await paymentService.getMyAllPayment(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "payment intent created successfully",
        data: payments
    })
})


export const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const payment = await paymentService.singlePayment(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "payment history fetched successfully",
        data: payment
    })
})

