import { Status } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        }
    })
    return users
}

const getSingleUser = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }, omit: {
            password: true
        }
    })
    return user
}

const updeteUserStatus = async (userId: string, status: Status) => {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status
        }, omit: {
            password: true
        }
    })
    return user
}

const getAllRentals = async () => {
    const rentals = await prisma.rental.findMany({})
    return rentals
}





const adminService = {
    getAllUsers,
    getSingleUser,
    updeteUserStatus,
    getAllRentals
}

export default adminService