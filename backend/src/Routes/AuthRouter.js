import express from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import AuthController from "../Controller/AuthController.js";
import EmailController from "../Controller/EmailController.js";
const authRouter = express.Router();

authRouter.post(
  "/auth/login",
  AuthMiddleware.loginMiddleware,
  AuthController.login
);

authRouter.post(
  "/auth/verify-email",
  AuthMiddleware.emailVerificationMiddleware,
  EmailController.verifyEmail
);

authRouter.post(
  "/register",
  AuthMiddleware.registerMiddleware,
  AuthController.register
);

authRouter.post(
  "/resend-verification-code",
  AuthMiddleware.resendVerificationCodeMiddleware,
  EmailController.resendVerificationCode
);

authRouter.post('/forgot-password', AuthController.forgotPassword);
authRouter.get('/reset-password', AuthMiddleware.resetTokenMiddleware, AuthController.resetToken);
authRouter.post('/reset-password', AuthMiddleware.resetPasswordMiddleware, AuthController.resetPassword);
export default authRouter;
