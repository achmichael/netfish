import ResponseError from "../Config/Error.js";
import UserRepository from "../Repository/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  
  constructor() {
    this.userRepository = new UserRepository();
  }

  async authenticate(req, email, password) {
    const user = await this.userRepository.getUserByEmail(email);
    if (
      user !== null &&
      (user.password !== "" || user.password !== null) &&
      (await bcrypt.compare(password, user.password))
    ) {
      const domain = (req.secure ? "https" : "http") + "://" + req.headers.host;
      const payload = {
        iss: domain,
        aud: domain,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          user_id: user.id,
          email: user.email,
          role: user.role
        },
      };
       const jwtSecret = process.env.JWT_SECRET;

       const token = jwt.sign(payload, jwtSecret);

       return token;
    }else{
        throw new ResponseError(401, "Invalid email or password");
    }
  } 
}


export default new AuthService();