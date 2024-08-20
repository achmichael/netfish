import PreOrderService from "../Service/PreOrderService.js";

class PreOrderController {

  createPreOrder = async (req, res, next) => {
    const userId = req.user.data.user_id;
    const datas = req.body;
    try {
      const newPreOrder = await PreOrderService.createPreOrder(datas, userId);
      res.status(201).json({
        message: "Pre Order added successfully",
        data: newPreOrder,
      });
    } catch (error) {
        console.log(error)
      next(error);
    }
  };

  updatePreOrder = async (req, res, next) => {
    const userId = req.params.user_id;
    const preOrderId = req.params.pre_order_id;
    const datas = req.body;
    try {
      const updatedPreOrder = await PreOrderService.updatePreOrder(
        preOrderId,
        datas,
        userId
      );
      res.status(201).json({
        message: "Pre order updated successfully",
        data: updatedPreOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  deletePreOrder = async (req, res, next) => {
    const preOrderId = req.params.pre_order_id;
    try {
      await PreOrderService.deletePreOrder(preOrderId);
      res.status(200).json({ message: "Pre order deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  getPreOrdersByUserId = async (req, res, next) => {
    const userId = req.user.data.user_id;
    try {
      const preOrders = await PreOrderService.getPreOrdersByUserId(userId);
      res
        .status(200)
        .json({ message: "Pre orders fetched successfully", data: preOrders });
    } catch (error) {
      next(error);
    }
  };

  getPreOrderById = async (req, res, next) => {
    const preOrderId = req.params.pre_order_id;

    try {
      const preOrder = await PreOrderService.getPreOrderById(preOrderId);
      res
        .status(200)
        .json({ message: "Pre order fetched successfully", data: preOrder });
    } catch (error) {
      next(error);
    }
  };

  getPreOrdersByProductId = async (req, res, next) => {
    const productId = req.params.product_id;
    try {
      const preOrders = await PreOrderService.getPreOrdersByProductId(
        productId
      );
      res
        .status(200)
        .json({ message: "Pre Orders fetched successfully", data: preOrders });
    } catch (error) {
      next(error);
    }
  };
}

export default new PreOrderController();
