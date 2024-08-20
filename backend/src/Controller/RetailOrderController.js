import RetailOrderService from "../Service/RetailOrderService.js";

class RetailOrderController {
  async createRetailOrder(req, res, next) {
    try {
      const userId = req.user.data.user_id;
      const orderData = req.body;
      const result = await RetailOrderService.createRetailOrder(
        orderData,
        userId
      );
      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllRetailOrdersByUserId(req, res, next) {
    try {
      const userId = req.user.data.user_id;
      const orders = await RetailOrderService.getAllRetailOrdersByUserId(
        userId
      );
      res.status(200).json({
        status: "success",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRetailOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await RetailOrderService.getRetailOrderById(id);
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRetailOrder(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.data.user_id;
      const orderData = req.body;
      const updatedOrder = await RetailOrderService.updateRetailOrder(
        id,
        orderData,
        userId
      );
      res.status(200).json({
        status: "success",
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRetailOrder(req, res, next) {
    try {
      const { id } = req.params;
      await RetailOrderService.deleteRetailOrder(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getRetailOrdersByProductId(req, res, next) {
    try {
      const { productId } = req.params;
      const orders = await RetailOrderService.getRetailOrdersByProductId(
        Number(productId)
      );
      res.status(200).json({
        status: "success",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RetailOrderController();
