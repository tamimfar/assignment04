import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import rentalService from "./rental.service";
import { sendResponse } from "../../utils/sendResponse";





const createRentalRequestfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { propertieId } = req.body

    const rentalRequest = await rentalService.createRentalRequest(req.user?.id as string, propertieId)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "rental request created successfully",
        data: rentalRequest
    })

})
const getRentalRequestfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const rentalRequests = await rentalService.getRentalRequests(userId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "rental requests fetched successfully",
        data: rentalRequests
    })

})

const getRentalRequestByIdfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const rentalRequestId = req.params.id as string
    const rentalRequest = await rentalService.getRentalRequestById(rentalRequestId)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "rental request fetched successfully",
        data: rentalRequest
    })

})


const rentalController = {
    createRentalRequestfromController,
    getRentalRequestfromController,
    getRentalRequestByIdfromController
}
export default rentalController
