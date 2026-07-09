import { prisma } from "../../lib/prisma";

const createRentalRequest = async (tenantId: string, propertieId: string) => {
    const rentalRequest = await prisma.rental.create({
        data: {
            tenantId,
            propertieId

        }
    })
    return rentalRequest

}
const getRentalRequests = async (userId: string) => {
    const rentalRequests = await prisma.rental.findMany({
        where: {
            tenantId: userId
        }
    })
    return rentalRequests
}

const getRentalRequestById = async (id: string) => {
    const rentalRequest = await prisma.rental.findUniqueOrThrow({
        where: {
            id
        }, include: {
            user: true,
            propertie: {
                include: {
                    user: true
                }
            }
        }
    })
    return rentalRequest
}
const rentalService = {
    createRentalRequest,
    getRentalRequests,
    getRentalRequestById
}

export default rentalService