import ResponseError from "../Config/Error.js";
import bcrypt from "bcrypt";
import User from "../Models/User.js";
import UserRepository from "../Repository/UserRepository.js";
import crypto from "crypto";
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data) {
    const { name, email, password, role } = data;

    const checkUser = await this.userRepository.getUserByEmail(email);

    if (checkUser) {
      throw new ResponseError(400, "User is already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(name, email, hashedPassword, role);

    return await this.userRepository.createUser(user);
  }

  async login(data) {
    const { email, password } = data;

    const checkUser = await this.userRepository.getUserByEmail(email);

    if (!checkUser) {
      throw new ResponseError(401, "User not found");
    }

    const isValid = await bcrypt.compare(password, checkUser.password);

    if (!isValid) {
      throw new ResponseError(400, "Incorrect Password");
    }

    const isVerified = checkUser.emailVerified;

    if (!isVerified) {
      throw new ResponseError(401, "Email not verified");
    }

    return true;
  }

  async saveVerificationCode(userId, verificationCode) {
    await this.userRepository.saveVerificationCode(userId, verificationCode);
  }

  async findUserByEmail(email) {
    return await this.userRepository.getUserByEmail(email);
  }

  async verifyEmail(userId) {
    await this.userRepository.verifyEmail(userId);
  }

  async forgotPassword(email) {
    const checkUser = await this.userRepository.getUserByEmail(email);

    if (!checkUser) {
      throw new ResponseError(404, "User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetTokenExpired = new Date(Date.now() + 3600000);

    const resetUrl = `${process.env.URL_FRONTEND}/reset-password?token=${resetToken}&id=${checkUser.id}`;

    await this.userRepository.saveResetPasswordToken(
      checkUser.id,
      hashedToken,
      resetTokenExpired
    );

    return resetUrl;
  }

  async getResetToken(id) {
    const userToken = await this.userRepository.getUserResetToken(id);
    return userToken;
  }

  async resetPassword(id, newPassword) {
    const user = await this.userRepository.getUserById(id);
    const userToken = await this.userRepository.getUserResetToken(id);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updatePasswordUser(user.id, hashedPassword);
    await this.userRepository.deleteResetPasswordToken(userToken.id);
  }
}

export default new UserService();
