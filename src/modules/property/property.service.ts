import { prisma } from "../../lib/prisma";



const getProperties = async () => {
    const properties = await prisma.propertie.findMany({})
    return properties
}

const getPropertyById = async (propertyId: string) => {
    const property = await prisma.propertie.findUniqueOrThrow({
        where: {
            id: propertyId
        }
    })
    return property
}

const getCategories = async () => {
    const categories = await prisma.category.findMany({})
    return categories
}

const propertyService = {
    getProperties,
    getPropertyById,
    getCategories
}

export default propertyService