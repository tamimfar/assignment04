import { Status } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { IAdmin } from './admin.interface';

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
            id: userId, // 👈 এখানে ডাইনামিক userId ব্যবহার করুন
        },
        data: {
            status, // 👈 সরাসরি 'status' ভ্যারিয়েবলটি বসিয়ে দিন (কোনো অবজেক্ট হবে না)
        },
        omit: {
            password: true,
        },
    });
    return user;
};

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