import ResponseError from "../Config/Error.js";
import CartRepository from "../Repository/CartRepository.js";
import ProductRepository from "../Repository/ProductRepository.js";

class CartMiddleware {
  async validateAddToCart(req, res, next) {
    const { productId, quantity, price, image } = req.body;
    const userId = req.user.data.user_id;
    if (!userId){
        return next(new ResponseError(401, "Unauthorized"));
    }
    
    if (!productId || !quantity || !price || !image) {
      return next(
        new ResponseError(400, "Missing required fields (productId, quantity, price, image), please check your data")
      );
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return next(new ResponseError(400, "Quantity must be a positive number"));
    }

    if (typeof price !== "number" || price <= 0) {
      return next(new ResponseError(400, "price must be a positive number"));
    }

    const productRepository = new ProductRepository();
    const product = await productRepository.getProductById(productId);

    if (!product) {
      return next(new ResponseError(404, "Product not found"));
    }

    if (product.stock < quantity) {
      return next(new ResponseError(400, `Insufficient stock. Only ${product.stock} kg available.`));
    }

    if (price !== product.price){
      return next(new ResponseError(400, "price does not match the expected price"));
    }
    next();
  }

  async validateRemoveFromCart(req, res, next) {
    const { cart_id } = req.params;

    const { productId } = req.body;

    const userId = req.user.data.user_id;

    if (!userId){
        return next(new ResponseError(401, "Unauthorized"));
    }
    
    if (!cart_id) {
      return next(new ResponseError(400, "Missing required params (cart_id), please check your data"));
    }

    if (!productId){
      return next(new ResponseError(400, "Missing required fields (productId)"));
    }

    const cartRepository = new CartRepository();
    const cartItem = await cartRepository.getCartItemByUserAndProduct(userId, productId);

    if (!cartItem) {
      return next(new ResponseError(404, "Item not found in cart"));
    }

    next();
  }

  async validateUpdateCartQuantity(req, res, next) {
    const { productId, quantity, price, image } = req.body;
    const userId = req.user.data.user_id;

    if (!userId){
        return next(new ResponseError(401, "Unauthorized"));
    }

    if (!productId || !quantity || !price || !image) {
      return next(
        new ResponseError(400, "Missing required fields (productId, quantity, price, image), please check your data")
      );
    }

    if (!productId || typeof quantity !== "number" || typeof price !== "number") {
      return next(
        new ResponseError(400, "Missing or invalid required fields (userId, productId, quantity, totalPrice), please check your data")
      );
    }

    if (quantity <= 0) {
      return next(new ResponseError(400, "Quantity must be a positive number"));
    }

    if (price <= 0) {
      return next(new ResponseError(400, "Total price must be a positive number"));
    }

    const cartRepository = new CartRepository();
    const cartItem = await cartRepository.getCartItemByUserAndProduct(userId, productId);

    if (!cartItem) {
      return next(new ResponseError(404, "Item not found in cart"));
    }

    const productRepository = new ProductRepository();
    const product = await productRepository.getProductById(productId);

    if (!product) {
      return next(new ResponseError(404, "Product not found"));
    }

    if (product.stock < quantity) {
      return next(new ResponseError(400, `Insufficient stock. Only ${product.stock} kg available.`));
    }

    if (price !== product.price){
      return next(new ResponseError(400, "price does not match the expected price"));
    }

    next();
  }

  async validateClearCart(req, res, next) {
    const { userId } = req.user.data.user_id;

    if (!userId) {
      return next(new ResponseError(400, "Missing required field (userId), please check your data"));
    }

    const cartRepository = new CartRepository();
    const cartItems = await cartRepository.getCartItemsByUserId(userId);

    if (!cartItems || cartItems.length === 0) {
      return next(new ResponseError(404, "No items found in cart"));
    }
    next();
  }
}

export default new CartMiddleware();
