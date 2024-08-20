import express from 'express';
import PreOrderMiddleware from '../Middleware/PreOrderMiddleware.js';
import PreOrderController from '../Controller/PreOrderController.js';

const preOrderRouter = express.Router();

// Create Pre Order
preOrderRouter.post('/', PreOrderMiddleware.preOrderMiddleware, PreOrderController.createPreOrder);

// Update Pre Order 
preOrderRouter.put('/:pre_order_id', PreOrderMiddleware.preOrderMiddleware, PreOrderController.updatePreOrder);

// Delete Pre Order
preOrderRouter.delete('/:pre_order_id', PreOrderController.deletePreOrder);

// Get Pre Orders user with Id from payload jwt
preOrderRouter.get('/user', PreOrderController.getPreOrdersByUserId);

// Get Pre Order by Id
preOrderRouter.get('/:pre_order_id', PreOrderController.getPreOrderById);

// Get Pre Orders by Product Id
preOrderRouter.get('/product/:product_id', PreOrderController.getPreOrdersByProductId);

export default preOrderRouter;