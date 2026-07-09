import { Router } from "express";
import AuthController from "./auth.controller";
import { auth } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post("/register", AuthController.authRegister)
router.post("/login", AuthController.authLogin)
router.get("/me", auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), AuthController.authMe)


const authRoute = {
    router
}

export default authRoute