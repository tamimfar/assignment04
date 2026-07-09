import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import reviewService from "./review.service"

const review = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const review = await reviewService.createReview(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "rental request created successfully",
        data: review
    })

})
const ReviewController = {
    review
}

export default ReviewController