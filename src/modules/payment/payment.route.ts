import { prisma } from "../../lib/prisma";
import { Router } from 'express';


import {
    createPaymentIntent,
    confirmPayment,
    heandelWebhook,
    getMyPaymentHistory,
    getPaymentDetails
} from './payment.controller';
import { auth } from "../../middlewares/auth.middlewares";
import { Role } from '../../../generated/prisma/enums';




const router = Router();


router.post('/create', auth(Role.TENANT), createPaymentIntent);
router.post('/confirm', auth(Role.TENANT), confirmPayment);
router.get('/', auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), getMyPaymentHistory);
router.get('/:id', auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), getPaymentDetails);

router.post('/webhook', heandelWebhook);





const paymentRoute = {
    router
}

export default paymentRoute;


