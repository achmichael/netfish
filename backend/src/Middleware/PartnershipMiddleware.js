import ResponseError from "../Config/Error.js";

class PartnershipMiddleware {
  partnershipMiddleware = (req, res, next) => {

    const { companyName} = req.body;

    const userId = req.user.data.user_id;

    if (!userId) {
      return next(new ResponseError(401, "Unauthorized"));
    }

    if (!companyName) {
      return next(
        new ResponseError(
          400,
          "field companyName is required"
        )
      );
    }

    if (
      !this.clearWhiteSpace(companyName) 
    ) {
      return next(
        new ResponseError(400, "Input cannot contain only whitespace")
      );
    }

    next();
  };

  clearWhiteSpace = (value) => {
    return value.trim() !== "";
  };

}

export default new PartnershipMiddleware();