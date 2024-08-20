import express from "express";
import PaymentController from "../Controller/PaymentController.js";
import PaymentMiddleware from "../Middleware/PaymentMiddleware.js";
const paymentRouter = express.Router();

paymentRouter.post(
  "/",
  PaymentMiddleware.validatePaymentFields,
  PaymentController.pay
);

export default paymentRouter;
