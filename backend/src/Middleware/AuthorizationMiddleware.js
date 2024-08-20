import ResponseError from "../Config/Error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
class AuthorizationMiddleware {

  accessValidation = (req, res, next) => {

    const token = this.extractToken(req.headers.authorization);

    if (!token) {
        return next(new ResponseError(401, "Unauthorized"));
    }

    try{
        const decoded = this.verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        next(error);
    }
  }
  extractToken = (authorization) => {

    if (!authorization) {
      throw new ResponseError(403, "Token is Required");
    }

    const token = authorization.split(" ");

    if (token.length !== 2 || token[0] !== "Bearer") {
      throw new ResponseError(400, "Invalid Token Format");
    }

    return token[1];
  };

  verifyToken = (token, secretKey) => {
    try {
        return jwt.verify(token, secretKey);
    }catch (error) {
        this.checkErrorByName(error.name);
    }
  }

  checkErrorByName = (errorName) => {
    if(errorName === "TokenExpiredError") {
        throw new ResponseError( 400, 'Token is expired');
    }else if (errorName === 'JsonWebTokenError') {
        throw new ResponseError( 400 ,'Invalid token');
    }else {
        throw new ResponseError(500, 'Token verification is failed');
    }
  }
}

export default new AuthorizationMiddleware();