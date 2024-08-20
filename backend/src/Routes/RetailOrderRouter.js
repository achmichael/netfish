import express from 'express';
import RetailOrderMiddleware from '../Middleware/RetailOrderMiddleware.js';
import RetailOrderController from '../Controller/RetailOrderController.js';

const retailOrderRouter = express.Router();

// Membuat retail order baru
retailOrderRouter.post(
  '/',
  RetailOrderMiddleware.retailOrderMiddleware,
  RetailOrderController.createRetailOrder
);
// Mendapatkan semua retail order untuk user tertentu
retailOrderRouter.get(
  '/user',
  RetailOrderMiddleware.authorizeUser,
  RetailOrderController.getAllRetailOrdersByUserId
);

// Mendapatkan retail order berdasarkan ID
retailOrderRouter.get(
  '/:id',
  RetailOrderMiddleware.authorizeUser,
  RetailOrderController.getRetailOrderById
);

// Mengupdate retail order
retailOrderRouter.put(
  '/:id',
  RetailOrderMiddleware.retailOrderMiddleware,
  RetailOrderController.updateRetailOrder
);

// Menghapus retail order
retailOrderRouter.delete(
  '/:id',
  RetailOrderMiddleware.authorizeUser,
  RetailOrderController.deleteRetailOrder
);

// Mendapatkan retail order berdasarkan product ID
retailOrderRouter.get(
  '/product/:productId',
  RetailOrderMiddleware.authorizeUser,
  RetailOrderController.getRetailOrdersByProductId
);

export default retailOrderRouter;