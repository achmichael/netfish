import UserService from "../Service/UserService.js";
import AuthService from "../Service/AuthService.js";
import crypto from "crypto";
import SendMail from "../Utils/SendMail.js";
import htmlContent from "../Utils/HtmlContent.js";
import dotenv from "dotenv";
dotenv.config();

class AuthController {
  register = async (req, res, next) => {
    const data = req.body;

    try {
      const user = await UserService.register(data);
      const verification_code = crypto
        .randomBytes(3)
        .toString("hex")
        .toUpperCase();

      //save verification code in database
      await UserService.saveVerificationCode(user.id, verification_code);
      // const verificationLink = `${process.env.URL_FRONTEND}/verify?code=${verification_code}`;
      const sendMail = new SendMail();
      const currentYear = new Date().getFullYear();
      const htmlBody = htmlContent(
        "verification",
        verification_code,
        "",
        currentYear
      );
      await sendMail.send(data.email, "Verification Code", htmlBody);
      res.status(200).send({
        success: true,
        message:
          "Registration successful. Please check your email for verification.",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  login = async (req, res, next) => {
    const data = req.body;

    try {
      await UserService.login(data);

      const token = await AuthService.authenticate(
        req,
        data.email,
        data.password
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
        role: data.role,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
      const resetUrl = await UserService.forgotPassword(email);
      const sendMail = new SendMail();
      const currentYear = new Date().getFullYear();
      const htmlBody = htmlContent("reset", "", resetUrl, currentYear);
      await sendMail.send(email, "Reset Password", htmlBody);
      res.status(200).send({
        success: true,
        message: "Password reset link has been sent to your email.",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  resetToken = async (req, res, next) => {
    const { id } = req.params;

    try {
      const resetToken = await UserService.getResetToken(id);
      if (resetToken) {
        res.status(200).json({
          success: true,
          message: "Reset token is valid",
        });
      }
    } catch (error) {
      next(error);A
    }
  };

  resetPassword = async (req, res, next) => {
    const { id, newPassword } = req.body;

    try {
      await UserService.resetPassword(id, newPassword);
      res.status(200).json({
        message: "Reset password successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
