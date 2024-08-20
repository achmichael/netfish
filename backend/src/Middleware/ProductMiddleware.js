import ResponseError from "../Config/Error.js";

class ProductMiddleware {
  
  validateProductFields = (name, description, price, weight, stock, next) => {
    if (!name || !description || !price || !weight || !stock) {
      return next(
        new ResponseError(
          400,
          "Missing required fields name or description or price or stock or weight"
        )
      );
    }

    if (!this.validateName(name)) {
      return next(
        new ResponseError(400, "Name must be less than 50 characters")
      );
    }

    if (!this.validateDescription(description)) {
      return next(
        new ResponseError(400, "Description must be less than 190 characters")
      );
    }

    if (!this.clearWhiteSpace(name) || !this.clearWhiteSpace(description)) {
      return next(
        new ResponseError(400, "Input cannot contains only whitespace")
      );
    }

    if (
      !this.validateWeightPriceStock(price) ||
      !this.validateWeightPriceStock(weight) ||
      !this.validateWeightPriceStock(stock)
    ) {
      return next(
        new ResponseError(
          400,
          "Price, weight and stock must be positive numbers"
        )
      );
    }
  };

  validateProductId = (product_id) => {
    
    // Check if the product_id consists of only digits
    const isNumberString = /^\d+$/.test(product_id);
    if (!isNumberString) {
        throw new ResponseError(400, "Invalid product ID");
    }
    
    // Convert product_id to a number

    const numericProductId = Number(product_id);
    
    // Check if the conversion to a number is valid

    if (isNaN(numericProductId)) {
        throw new ResponseError(400, "Product ID must be a number");
    }
    
    return true;
};

  validateWeightPriceStock = (value) => {
    return !isNaN(value) || value > 0;
  };

  clearWhiteSpace = (value) => {
    return value.trim() !== "";
  };

  validateDescription = (value) => {
    return value.length < 190;
  };

  validateName = (name) => {
    return name.length < 50;
  };

  validateCatchDate = (catchDate) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(catchDate);
  };

  productMiddleware = (req, res, next) => {
    const {
      name,
      description,
      price,
      weight,
      catchDate = null,
      processType = null,
      stock,
    } = req.body;

    if (catchDate && !this.validateCatchDate(catchDate)) {
      if (!this.clearWhiteSpace(catchDate)) {
        return next(
          new ResponseError(400, "Catch date must be in the format YYYY-MM-DD")
        );
      }
    }

    if (processType && !this.clearWhiteSpace(processType)) {
      return next(
        new ResponseError(400, "Process type cannot contain only whitespace")
      );
    }

    this.validateProductFields(name, description, price, weight, stock, next);

    next();
  };
}

export default new ProductMiddleware();
