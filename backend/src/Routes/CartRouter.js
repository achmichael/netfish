import express from 'express';
import CartMiddleware from '../Middleware/CartMiddleware.js';
import CartController from '../Controller/CartController.js';

const cartRouter = express.Router();

cartRouter.post('/', CartMiddleware.validateAddToCart, CartController.addProductToCart);
cartRouter.get('/', CartController.getCartByUserId);
cartRouter.get('/:cart_id', CartController.getCartByCartId);
cartRouter.delete('/:cart_id', CartMiddleware.validateRemoveFromCart, CartController.deleteCartByCartId);
cartRouter.put('/quantity/:cart_id', CartMiddleware.validateUpdateCartQuantity, CartController.updateCartItem);
cartRouter.put('/:cart_id', CartController.updateCartItem);

export default cartRouter;