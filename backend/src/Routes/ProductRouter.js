import express from "express";
import ProductController from "../Controller/ProductController.js";
import ProductMiddleware from "../Middleware/ProductMiddleware.js";
import RoleMiddleware from "../Middleware/RoleMiddleware.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  RoleMiddleware.authorizeRole("PARTNER"),
  ProductMiddleware.productMiddleware,
  ProductController.addProduct
);
productRouter.put(
  "/product/:product_id",
  RoleMiddleware.authorizeRole("PARTNER"),
  ProductMiddleware.productMiddleware,
  ProductController.updateProduct
);
productRouter.get("/product/:product_id", ProductController.getProductById);
productRouter.delete(
  "/product/:product_id",
  RoleMiddleware.authorizeRole("PARTNER"),
  ProductController.deleteProduct
);
productRouter.get(
  "/",
  RoleMiddleware.authorizeRole("CONSUMER", "PARTNER", "ADMIN"),
  ProductController.getProducts
);
export default productRouter;
