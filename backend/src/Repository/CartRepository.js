import instance from "../Config/Prisma.js";

class CartRepository {
  async addProductToCart(cart) {
    return await instance.getClient().cartItem.create({
      data: cart.toObject(),
    });
  }

  async getCartItemByUserAndProduct(userId, productId) {
    return await instance.getClient().cartItem.findFirst({
      where: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });
  }

  async getCartByUserId(userId) {
    return await instance.getClient().cartItem.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
  }

  async deleteCartByCartId(cartId) {
    return await instance.getClient().cartItem.delete({
      where: {
        id: parseInt(cartId),
      },
    });
  }

  async updateCart(cartId, cart) {
    return await instance.getClient().cartItem.update({
      where: {
        id: parseInt(cartId),
      },
      data: cart.toObject(),
    });
  }

  async deleteCartByProductId(productId) {
    return await instance.getClient().cartItem.deleteMany({
      where: {
        productId: parseInt(productId),
      },
    });
  }

  async deleteCartByUserAndProductId(userId, productId) {
    return await instance.getClient().cartItem.delete({
      where: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });
  }
}

export default CartRepository;
