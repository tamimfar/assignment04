import express from "express";
import ReviewController from "./review.controller";
import { auth } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma/enums";

const router = express.Router();

router.post("/", auth(Role.TENANT), ReviewController.review)


const reviewRoute = {
    router
}

export default reviewRoute