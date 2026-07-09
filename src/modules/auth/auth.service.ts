import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { LoginUserInterface, RegisterUserInterface } from "./auth.interface";
import { generateToken } from "../../utils/jwt";



const registerService = async (payload: RegisterUserInterface) => {
    const { email, password, name, role } = payload
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role
        }
    })

    return user


}
const loginFromService = async (payload: LoginUserInterface) => {
    const { email, password } = payload

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })


    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error("Invalid credentials")
    }
    const JwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const access_tocken = generateToken(JwtPayload, process.env.JWT_SECRET_A as string)
    const refresh_tocken = generateToken(JwtPayload, process.env.JWT_SECRET_R as string)
    return { access_tocken, refresh_tocken }

}

const getUser = async (id: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }, omit: {
            password: true
        }
    })
    return user
}

export const AuthService = {
    registerService,
    loginFromService,
    getUser
}