import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import adminService from "./admin.service"
import { send } from "node:process";
import { sendResponse } from "../../utils/sendResponse";

const getAllUsersfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await adminService.getAllUsers();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "users fetched successfully",
        data: user
    })

})
const getUserByIdfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string
    const user = await adminService.getSingleUser(userId)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "user fetched successfully",
        data: user
    })


})
const updateUserByIdfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string
    const { status } = req.body
    const user = await adminService.updeteUserStatus(userId, status)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "user updated successfully",
        data: user
    })
})
const getAllRentelsfromController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await adminService.getAllRentals();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "rentals fetched successfully",
        data: user
    })

})


const adminController = {
    getAllUsersfromController,
    getUserByIdfromController,
    updateUserByIdfromController,
    getAllRentelsfromController
}
export default adminController