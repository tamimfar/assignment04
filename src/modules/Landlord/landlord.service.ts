import { prisma } from "../../lib/prisma";
import { propertyInterface } from "./landlord.interface";



const createProperty = async (landlordId: string, payload: propertyInterface) => {
    const property = await prisma.propertie.create({
        data: {
            ...payload,
            landlordId

        }
    })
    return property
}
const updateProperty = async (propertyId: string, payload: propertyInterface) => {
    const property = await prisma.propertie.update({
        where: {
            id: propertyId
        },
        data: {
            ...payload
        }
    })
    return property
}

const deleteProperty = async (propertyId: string) => {
    const property = await prisma.propertie.delete({
        where: {
            id: propertyId
        }
    })
    return property
}

const getReqest = async (landlordId: string) => {
    const property = await prisma.rental.findMany({
        where: {
            propertie: {
                landlordId
            }

        }
    })
    return property
}
const pachRequest = async (landlordId: string, requsetId: string, status: "APPROVED" | "REJECTED") => {
    const existingRequest = await prisma.rental.findFirst({
        where: {
            id: requsetId,
            propertie: {
                landlordId: landlordId
            }
        }
    });


    if (!existingRequest) {
        throw new Error("Rental request not found or unauthorized");
    }

    const updatedProperty = await prisma.rental.update({
        where: {
            id: requsetId
        },
        data: {
            status: status,
            approvedDate: new Date()
        }
    });

    return updatedProperty;
}

export const landlordService = {
    createProperty,
    updateProperty,
    deleteProperty,
    getReqest,
    pachRequest
}
export default landlordService