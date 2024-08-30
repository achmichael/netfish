import ResponseError from "../Config/Error.js";
import UserRepository from "../Repository/UserRepository.js";
import crypto from "crypto";

class AuthMiddleware {
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{:;.,<>?]).{8,}$/;
    return regex.test(password);
  }

  validateRole(role) {
    return ["CONSUMER", "PARTNER", "ADMIN"].includes(role);
  }

  clearWhiteSpace(value) {
    return value.trim() !== "";
  }

  samePassword(password, rePassword) {
    return password === rePassword;
  }

  validateLoginFields = (email, password, next) => {
    if (!email || !password) {
      return next(
        new ResponseError(
          400,
          "Missing required fields, please check your data"
        )
      );
    }

    if (!this.clearWhiteSpace(email) || !this.clearWhiteSpace(password)) {
      return next(
        new ResponseError(400, "Data cannot contain only whitespace")
      );
    }

    if (!this.validateEmail(email)) {
      return next(new ResponseError(400, "Invalid email"));
    }

    if (!this.validatePassword(password)) {
      return next(
        new ResponseError(
          400,
          "Invalid password, password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }
  };

  validateRegisterFields = (name, email, password, rePassword, role, next) => {
    if (!name || !email || !password || !rePassword || !role) {
      return next(
        new ResponseError(
          400,
          "Missing required fields (name, email , password, rePassword, role), please check your data"
        )
      );
    }

    if (
      !this.clearWhiteSpace(name) ||
      !this.clearWhiteSpace(email) ||
      !this.clearWhiteSpace(password) ||
      !this.clearWhiteSpace(rePassword) ||
      !this.clearWhiteSpace(role)
    ) {
      return next(
        new ResponseError(400, "Data cannot contain only whitespace")
      );
    }

    if (!this.validateEmail(email)) {
      return next(new ResponseError(400, "Invalid email"));
    }

    if (!this.validatePassword(password)) {
      return next(
        new ResponseError(
          400,
          "Invalid password, password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }

    if (!this.validateRole(role)) {
      return next(
        new ResponseError(
          400,
          "Invalid role. Valid roles are: CONSUMER, PARTNER, ADMIN"
        )
      );
    }

    if (!this.samePassword(password, rePassword)) {
      return next(new ResponseError(400, "Passwords do not match"));
    }
  };

  updateMiddleware = async (req, res, next) => {
    const { user_id } = req.params;

    const { name, email, role } = req.body;

    if (!user_id) {
      return next(new ResponseError(400, "User ID is required"));
    }

    if (!name || !email || !role) {
      return next(
        new ResponseError(
          400,
          "Missing required fields (name, email, role), please check your data"
        )
      );
    }

    if (
      !this.clearWhiteSpace(name) ||
      !this.clearWhiteSpace(email) ||
      !this.clearWhiteSpace(role)
    ) {
      return next(
        new ResponseError(400, "Data cannot contain only whitespace")
      );
    }

    if (!this.validateEmail(email)) {
      return next(new ResponseError(400, "Invalid email"));
    }

    const userRepository = new UserRepository();
    const user = await userRepository.getUserById(user_id);
    if (!user) {
      return next(new ResponseError(404, "User not found"));
    }

    next();
  };
  
  loginMiddleware = (req, res, next) => {
    const { email, password } = req.body;

    this.validateLoginFields(email, password, next);

    next();
  };

  registerMiddleware = (req, res, next) => {
    const { name, email, password, rePassword, role } = req.body;

    this.validateRegisterFields(name, email, password, rePassword, role, next);

    next();
  };

  emailVerificationMiddleware = (req, res, next) => {
    const { email, verification_code } = req.body;

    if (!email || !verification_code) {
      return next(
        new ResponseError(
          400,
          "Missing required fields (email, verification_code), please check your data"
        )
      );
    }

    if (
      !this.clearWhiteSpace(email) ||
      !this.clearWhiteSpace(verification_code)
    ) {
      return next(
        new ResponseError(400, "Data cannot contain only whitespace")
      );
    }

    if (!this.validateEmail(email)) {
      return next(new ResponseError(400, "Invalid email"));
    }

    next();
  };

  resendVerificationCodeMiddleware = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return next(
        new ResponseError(
          400,
          "Missing required field (email), please check your data"
        )
      );
    }

    if (!this.clearWhiteSpace(email)) {
      return next(
        new ResponseError(400, "Data cannot contain only whitespace")
      );
    }

    if (!this.validateEmail(email)) {
      return next(new ResponseError(400, "Invalid email"));
    }

    next();
  };

  resetTokenMiddleware = async (req, res, next) => {
    const { token, id } = req.params;

    const userRepository = new UserRepository();

    const userToken = await userRepository.getUserResetToken(id);

    const user = await userRepository.getUserById(id);

    if (!user) {
      return next(new ResponseError(404, "User not found"));
    }

    if (!userToken) {
      return next(new ResponseError(400, "expired reset token"));
    }

    if (!this.compareToken(userToken.token, token)) {
      return next(new ResponseError(400, "Invalid reset token"));
    }
    next();
  };

  resetPasswordMiddleware = async (req, res, next) => {
    const { token, id, newPassword } = req.body;

    const userRepository = new UserRepository();

    if (!token || !id || !newPassword) {
      return next(
        new ResponseError(
          400,
          "Missing required fields (token, id, newPassword)"
        )
      );
    }

    if (!this.clearWhiteSpace(token) || !this.clearWhiteSpace(newPassword)) {
      return next(
        new ResponseError(400, "inputs cannot contains only whitespace")
      );
    }

    const user = await userRepository.getUserById(id);

    if (!user) {
      return next(new ResponseError(400, "User not found"));
    }

    const userToken = await userRepository.getUserResetToken(id);

    if (!userToken) {
      return next(new ResponseError(400, "Reset token is expired"));
    }

    if (!this.compareToken(userToken.token, token)) {
      return next(new ResponseError(400, "Invalid reset token"));
    }
    next();
  };

  compareToken(storedToken, providedToken) {
    return (
      crypto.createHash("sha256").update(providedToken).digest("hex") ===
      storedToken
    );
  }
}

export default new AuthMiddleware();
