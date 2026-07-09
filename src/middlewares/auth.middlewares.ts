import { NextFunction, Request, Response } from "express"
import { Role } from "../../generated/prisma/enums"
import { catchAsync } from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                name: string,
                role: Role
            }
        }
    }
}
export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.access_tocken
        if (!token) {
            throw new Error("User is not authenticated")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_A as string)
        const { email, name, id, role } = decoded as JwtPayload

        if (!requiredRoles.includes(role as Role)) {
            throw new Error("User is not authorized")
        }
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id, email, name, role
            }
        })
        if (user.status === "BAN" as string) {
            throw new Error("User is banned")
        }
        req.user = { id, email, name, role }

        next()
    })
}
