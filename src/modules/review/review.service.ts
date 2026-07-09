import { prisma } from "../../lib/prisma";
import { review } from "./review.interface";
const createReview = async (payload: review) => {

    const { rating, comment, tenantId, propertiesId, transactionId } = payload


    const payment = await prisma.payment.findUnique({
        where: { transactionId: transactionId as string },
        include: {
            user: { select: { name: true, email: true } },
            rentalRequest: true
        }
    })
    if (!payment || payment.status !== "COMPLETED") {
        throw new Error("payment not completed")
    }
    const review = await prisma.review.create({

        data: {
            rating: rating.toString(),
            comment: comment,
            tenantId: tenantId,
            propertiesId: propertiesId

        }
    })
    return review
}







const reviewService = {
    createReview
}

export default reviewService