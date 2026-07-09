import { Router } from "express";
import rentalController from "./rental.controller";
import { auth } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma/enums";





const router = Router();



router.post("/", auth(Role.TENANT), rentalController.createRentalRequestfromController)
router.get("/", auth(Role.TENANT), rentalController.getRentalRequestfromController)
router.get("/:id", auth(Role.TENANT), rentalController.getRentalRequestByIdfromController)






const rentalRoute = {
    router
}

export default rentalRoute