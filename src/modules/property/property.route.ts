import { Router } from "express";
import propertyController from "./property.controller";

const router = Router();

router.get("/properties", propertyController.getAllPropertiesfromController)
router.get("/properties/:id", propertyController.getPropertyByIdfromController)
router.get("/categories", propertyController.getAllCategoriesfromController)





const propertyRoute = {
    router
}

export default propertyRoute