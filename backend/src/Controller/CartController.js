import CartService from "../Service/CartService.js";

class CartController {
  addProductToCart = async (req, res, next) => {
    try {
      const newItem = await CartService.addProductToCart(
        req.body,
        req.user.data.user_id
      );
      res
        .status(201)
        .json({
          message: "Product added to cart successfully",
          data: newItem,
          success: true,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getCartByUserId = async (req, res, next) => {
    try {
      const cart = await CartService.getCartByUserId(req.user.data.user_id);
      res
        .status(200)
        .json({ message: "Cart retrieved successfully", data: cart });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteCartByCartId = async (req, res, next) => {
    try {
      await CartService.deleteCartById(req.params.cart_id);
      res
        .status(200)
        .json({ message: "Cart deleted successfully", success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteCartByProductId = async (req, res, next) => {
    try {
      await CartService.deleteCartByProductId(req.params.product_id);
      res
        .status(204)
        .json({ message: "Cart item deleted successfully", success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateCartItem = async (req, res, next) => {
    try {
      const updatedItem = await CartService.updateCart(
        req.params.cart_id,
        req.body,
        req.user.data.user_idC
      );
      res
        .status(200)
        .json({ message: "Cart item updated successfully", data: updatedItem });
    } catch (error) {
      next(error);
    }
  };

  getCartByCartId = async (req, res, next) => {
    try {
      const cart = await CartService.getCartById(req.params.cart_id);
      res
        .status(200)
        .json({ message: "Cart retrieved successfully", data: cart });
    } catch (error) {
      next(error);
    }
  };
}

export default new CartController();
