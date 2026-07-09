
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import propertyService from "./property.service";
import { sendResponse } from "../../utils/sendResponse";

const getAllPropertiesfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const properties = await propertyService.getProperties();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "properties fetched successfully",
        data: properties
    })

})
const getPropertyByIdfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id as string
    const property = await propertyService.getPropertyById(propertyId)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property fetched successfully",
        data: property
    })

})
const getAllCategoriesfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await propertyService.getCategories();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "categories fetched successfully",
        data: categories
    })

})

const propertyController = {
    getAllPropertiesfromController,
    getPropertyByIdfromController,
    getAllCategoriesfromController

}

export default propertyController