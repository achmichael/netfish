import instance from "../Config/Prisma.js";

class PreOrderRepository {
  async createPreOrder(preOrder) {
    return await instance.getClient().preOrder.create({
      data: preOrder.toObject(),
    });
  }

  async getPreOrderById(preOrderId){
    return await instance.getClient().preOrder.findUnique({
      where: {
        id: parseInt(preOrderId),
      },
    });
  }
  async getPreOrdersByUserId(userId) {
    return await instance.getClient().preOrder.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
  }

  async updatePreOrder(preOrderId, preOrder) {
    return await instance.getClient().preOrder.update({
      where: {
        id: parseInt(preOrderId),
      },
      data: preOrder.toObject(),
    });
  }

  async deletePreOrder(preOrderId) {
    return await instance.getClient().preOrder.delete({
      where: {
        id: parseInt(preOrderId),
      },
    });
  }

  async getTotalPriceByUserId () {
    return await instance.getClient().preOrder.aggregate({
        _sum: {
            totalPrice: true,
        },
        where: {
          userId: parseInt(userId),
        },
    })
  }

// Method mencari data preOrder produk tertentu
  async getPreOrdersByProductId(productId) {
    return await instance.getClient().preOrder.findMany({
        where: {
            productId: parseInt(productId),
        },
    })
  }

//   Method untuk mencari preOrder user tertentu dan produk tertentu
  async getPreOrdersByUserIdAndProductId(userId, productId) {
    return await instance.getClient().preOrder.findUnique({
        where: {
            userId: parseInt(userId),
            productId: parseInt(productId),
        },
    })
  }
}

export default PreOrderRepository;
