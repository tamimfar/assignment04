import { Router } from "express";
import adminController from "./admin.controller";
import { auth } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma/enums";



const router = Router();


router.get("/users", auth(Role.ADMIN), adminController.getAllUsersfromController)
router.get("/users/:id", auth(Role.ADMIN), adminController.getUserByIdfromController)
router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserByIdfromController)
router.get("/rentals", auth(Role.ADMIN), adminController.getAllRentelsfromController)






const adminRoute = {
    router
}

export default adminRoute