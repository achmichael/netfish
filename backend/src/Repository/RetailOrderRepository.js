import instance from "../Config/Prisma.js";

class RetailOrderRepository {

  async createRetailOrder(retailOrder) {
    return await instance.getClient().retailOrder.create({
      data: retailOrder.toObject(),
    });
  }

  async getRetailOrderById(id) {
    return await instance.getClient().retailOrder.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async getAllRetailOrdersByUserId(userId) {
    return await instance.getClient().retailOrder.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
  }

  async updateRetailOrder(id, retailOrder) {
    return await instance.getClient().retailOrder.update({
      where: {
        id: parseInt(id),
      },
      data: retailOrder.toObject(),
    });
  }

  async deleteRetailOrder(id) {
    return await instance.getClient().retailOrder.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async getRetailOrdersByProductId(productId) {
    return await instance.getClient().retailOrder.findMany({
      where: {
        productId: parseInt(productId),
      },
    });
  }
}

export default RetailOrderRepository;
