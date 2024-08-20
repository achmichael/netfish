import express from 'express';
import ProductController from '../Controller/ProductController.js';
import ProductMiddleware from '../Middleware/ProductMiddleware.js';

const productRouter = express.Router();

productRouter.post('/', ProductMiddleware.productMiddleware, ProductController.addProduct);
productRouter.put('/product/:product_id', ProductMiddleware.productMiddleware, ProductController.updateProduct);
productRouter.get('/product/:product_id', ProductController.getProductById);
productRouter.delete('/product/:product_id', ProductController.deleteProduct);
productRouter.get('/', ProductController.getProducts);
export default productRouter;