import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import landlordService from "./landlord.service";

import { sendResponse } from "../../utils/sendResponse";


const createPropertyfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const property = await landlordService.createProperty(req.user?.id as string, req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property created successfully",
        data: property
    })

})

const updatePropertyfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id as string
    const property = await landlordService.updateProperty(propertyId, req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property created successfully",
        data: property
    })
})

const deletePropertyfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id as string
    const property = await landlordService.deleteProperty(propertyId)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property deleted successfully",
        data: property
    })

})

const getReqetfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const landlordId = req.user?.id as string
    const property = await landlordService.getReqest(landlordId)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property fetched successfully",
        data: property
    })

})

const getReqetIdfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const requsetId = req.params.id as string
    const { status } = req.body
    const request = await landlordService.pachRequest(req.user?.id as string, requsetId, status)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property fetched successfully",
        data: request
    })

})

const landlordController = {
    createPropertyfromController,
    updatePropertyfromController,
    deletePropertyfromController,
    getReqetfromController,
    getReqetIdfromController
}

export default landlordController