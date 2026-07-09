import cookieParser from "cookie-parser"
import core from "cors"
import express, { Application, Request, Response } from "express";



import authRoute from "./modules/auth/auth.route";
import landlordRoute from "./modules/Landlord/landlord.route";
import propertyRoute from "./modules/property/property.route";
import rentalRoute from "./modules/rentalRequests/rental.route";
import paymentRoute from "./modules/payment/payment.route";
import reviewRoute from "./modules/review/review.route";
import adminRoute from "./modules/admin/admin.route";



const app: Application = express();

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.use(core({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())




app.use("/api/auth", authRoute.router)
app.use("/api/landlord", landlordRoute.router)
app.use("/api", propertyRoute.router)
app.use("/api/rental", rentalRoute.router)
app.use("/api/payments", paymentRoute.router)
app.use("/api/reviews", reviewRoute.router)
app.use("/api/admin", adminRoute.router)


app.use((err: any, req: Request, res: Response, next: any) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode,
        stack: err.stack
    })
})


export default app