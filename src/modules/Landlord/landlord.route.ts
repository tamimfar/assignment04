import { Router } from "express";
import landlordController from "./landlord.controller";
import { auth } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post("/properties", auth(Role.LANDLORD), landlordController.createPropertyfromController)
router.put("/properties/:id", auth(Role.LANDLORD), landlordController.updatePropertyfromController)
router.delete("/properties/:id", auth(Role.LANDLORD), landlordController.deletePropertyfromController)
router.get("/requests", auth(Role.LANDLORD), landlordController.getReqetfromController)
router.patch("/requests/:id", auth(Role.LANDLORD), landlordController.getReqetIdfromController)




const landlordRoute = {
    router
}

export default landlordRoute
