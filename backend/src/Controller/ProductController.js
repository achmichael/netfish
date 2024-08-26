import ResponseError from "../Config/Error.js";
import ProductService from "../Service/ProductService.js";
import ProductMiddleware from "../Middleware/ProductMiddleware.js";

class ProductController {

  addProduct = async (req, res, next) => {
    const data = req.body;
    try {
      const newProduct = await ProductService.addProduct(data);
      res
        .status(201)
        .json({
          message: "Product added successfully",
          data: newProduct,
          success: true,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    const product_id = req.params.product_id;

    if (!product_id) {
      return next(new ResponseError(400, "Product ID is required"));
    }
    try {
      ProductMiddleware.validateProductId(product_id);
      const updatedProduct = await ProductService.updateProduct(
        product_id,
        req.body
      );
      res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    const product_id = req.params.product_id;
    if (!product_id) {
      return next(new ResponseError(400, "Product ID is required"));
    }
    try {
      ProductMiddleware.validateProductId(product_id);
      await ProductService.deleteProduct(product_id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req, res, next) => {
    const product_id = req.params.product_id;
    if (!product_id) {
      return next(new ResponseError(400, "Product ID is required"));
    }
    try {
      ProductMiddleware.validateProductId(product_id);
      const product = await ProductService.getProductById(product_id);
      if (!product) {
        return next(new ResponseError(404, "Product not found"));
      }
      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  getProducts = async (req, res, next) => {
    try {
      const data = await ProductService.getProducts();
      res
        .status(200)
        .json({ message: "Fetched data products successfully", data: data, success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController();
