import ResponseError from "../Config/Error.js";

class PreOrderMiddleware {
  validatePreOrderFields = (
    productId,
    quantity,
    totalPrice,
    deliveryDate,
    next
  ) => {
    if (!productId || !quantity || !totalPrice || !deliveryDate) {
      return next(
        new ResponseError(
          400,
          "productId, quantity, totalPrice, and deliveryDate are required"
        )
      );
    }

    if (
      !this.validateNumber(productId) ||
      !this.validateNumber(quantity) ||
      !this.validateNumber(totalPrice)
    ) {
      return next(new ResponseError(400, "productId, quantity, or totalPrice"));
    }

    if (!this.validateDate(deliveryDate)) {
      return next(new ResponseError(400, "Invalid deliveryDate"));
    }

    // Jika semua validasi berhasil, lanjutkan ke middleware berikutnya
    return next();
  };

  validateDate = (deliveryDate) => {
    const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    return dateTimePattern.test(deliveryDate);
  };

  validateNumber = (value) => {
    const number = Number(value);

    if (isNaN(number) || number < 0) {
      return false;
    }

    return true;
  };

  preOrderMiddleware = (req, res, next) => {
    this.validatePreOrderFields(
      req.body.productId,
      req.body.quantity,
      req.body.totalPrice,
      req.body.deliveryDate,
      next
    );
  };
}

export default new PreOrderMiddleware();
