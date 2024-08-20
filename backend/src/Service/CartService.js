import CartRepository from "../Repository/CartRepository.js";
import Cart from "../Models/Cart.js";

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    async addProductToCart ( data, userId ) {
        const { productName ,productId, price, quantity, image } = data;
        
        const cart = new Cart(userId, productName ,productId, quantity, price, image);

        return await this.cartRepository.addProductToCart(cart);
    }

    async getCartByUserId ( userId ) {
        return await this.cartRepository.getCartByUserId(userId);
    }

    async deleteCartById ( cartId ) {
        return await this.cartRepository.deleteCartByCartId(cartId);
    }

    async updateCart ( cartId, data, userId ) {
        const { productName ,productId, price, quantity, image } = data;
        
        const cart = new Cart(userId, productName,productId, quantity, price, image);

        return await this.cartRepository.updateCart(cartId, cart);
    }

    async deleteCartByProductId (productId) {
        return await this.cartRepository.deleteCartByProductId(productId);
    }
}

export default new CartService();