import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { userValidationSchema } from "../../utils/validation";



const authRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body
    const { name, email, password } = userValidationSchema.parse(req.body);

    const payload = { name, email, password, role }
    const user = await AuthService.registerService(payload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "user registration successful",
        data: user
    })

})
const authLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { access_tocken, refresh_tocken } = await AuthService.loginFromService(req.body)

    res.cookie("access_tocken", access_tocken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 })
    res.cookie("refresh_tocken", refresh_tocken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 4 * 24 * 60 * 60 * 1000 })


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "user login successful",
        data: {}
    })
})

const authMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.getUser(req.user?.id as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "user login successful",
        data: { user }
    })
})


const AuthController = {
    authRegister,
    authLogin,
    authMe
}

export default AuthController