import UserService from "../Service/UserService.js";
import AuthService from "../Service/AuthService.js";
import crypto from "crypto";
import SendMail from "../Utils/SendMail.js";
import htmlContent from "../Utils/HtmlContent.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import instance from "../Config/Prisma.js";
import jwt from "jsonwebtoken";
import UserRepository from "../Repository/UserRepository.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      const user = await UserService.login(data);

      const token = await AuthService.authenticate(
        req,
        data.email,
        data.password
      );

      res.status(200).json({
        message: "Login successful",
        success: true,
        data: {
          token: token,
          role: user.role,
          email: data.email,
          name: user.name,
        },
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
      next(error);
      A;
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

  googleCallback = async (req, res, next) => {
    const { token } = req.body;

    const userRepository = new UserRepository();
    if (!token) {
      return next(new ResponseError(404, "Token not found"));
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const { sub, email, name, picture } = payload;

      let user = await instance.getClient().googleAccount.findUnique({
        where: { googleId: sub },
      });

      if (!user) {
        // Jika pengguna tidak ada, lakukan registrasi pengguna baru
        user = await instance.getClient().googleAccount.create({
          data: {
            googleId: sub,
            email: email,
            name: name,
            picture: picture,
            user: {
              connectOrCreate: {
                where: {
                  email: email,
                },
                create: {
                  name: name,
                  email: email,
                  picture: picture,
                },
              },
            },
          },
        });
      }

      const userEmail = await userRepository.getUserByEmail(email);

      if (!userEmail) {
        return next(new ResponseError(400, "User not registered"));
      }
      const domain = (req.secure ? "https" : "http") + "://" + req.headers.host;
      const identity = {
        iss: domain,
        aud: domain,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          user_id: user.id,
          email: user.email,
          role: userEmail.role,
        },
      };

      const appToken = jwt.sign(identity, process.env.JWT_SECRET);

      //mengirim token sebagai cookie
      // res.cookie("token", appToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "Strict",
      // });

      // Kirim respons kembali ke frontend dengan token dan data pengguna
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token: appToken,
          email: email,
          name: name,
          role: userEmail.role,
          image: picture,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      if (req.cookies) {
        Object.keys(req.cookies).forEach((cookie) => {
          if (typeof cookie === "string") {
            console.log(`Menghapus cookie: ${cookie}`);
            res.clearCookie(cookie);
          } else {
            console.warn(
              `Tidak bisa menghapus cookie: Nama cookie bukan string`
            );
          }
        });
      }

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new AuthController();
