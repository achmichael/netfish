import ResponseError from "../Config/Error.js";
import UserService from "../Service/UserService.js";
import crypto from "crypto";
import SendMail from "../Utils/SendMail.js";
import htmlContent from "../Utils/HtmlContent.js";

class EmailController {
  verifyEmail = async (req, res, next) => {
    const { email, verification_code } = req.body;
    try {
      const user = await UserService.findUserByEmail(email);

      if (!user) {
        return next(new ResponseError(404, "User not found"));
      }

      if (user.verification_code !== verification_code) {
        return next(new ResponseError(401, "Incorrect verification code"));
      }

      await UserService.verifyEmail(user.id);
      res
        .status(200)
        .json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      next(error);
    }
  };

  resendVerificationCode = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        return next(new ResponseError(404, "User not found"));
      }

      if (user.emailVerified) {
        return next(new ResponseError(400, "Email already verified"));
      }

      const verification_code = crypto
        .randomBytes(3)
        .toString("hex")
        .toUpperCase();

      await UserService.saveVerificationCode(user.id, verification_code);

      const sendMail = new SendMail();
      const currentYear = new Date().getFullYear();
      const htmlBody = htmlContent('verification', verification_code, '', currentYear);
      await sendMail.send(user.email, "Verification Code", htmlBody);
      res
        .status(200)
        .json({
          success: true,
          message: "Kode verifikasi berhasil dikirimkan",
        });
    } catch (error) {
      next(error);
    }
  };
}

export default new EmailController();
