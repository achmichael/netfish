import instance from "../Config/Prisma.js";

class ProductRepository {
  async getAllProducts() {
    return await instance.getClient().product.findMany();
  }

  async getProductById(id) {
    return await instance.getClient().product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createProduct(product) {
    return await instance.getClient().product.create({
      data: product.toObject(),
    });
  }

  async updateProduct(id, product) {
    return await instance.getClient().product.update({
      where: {
        id: parseInt(id),
      },
      data: product.toObject(),
    });
  }

  async deleteProduct(id) {
    return await instance.getClient().product.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async getProductByCategory(product) {
    return await instance.getClient().product.findMany({
      where: {
        isProcessed: product.isProcessed,
      },
    });
  }

  async getProductByPriceRange(min, max) {
    return await instance.getClient().product.findMany({
      where: {
        // price_gte adalah operator filter yang berarti "greater than or equal to" (lebih besar dari atau sama dengan).
        price_gte: min,
        // price_lte adalah operator filter yang berarti "less than or equal to" (kurang dari atau sama dengan).
        price_lte: max,
      },
    });
  }

  async updateStockProduct(id, stock) {
    return await instance.getClient().product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        stock: stock,
      },
    });
  }

  async getProductBySearch(search) {
    return await instance.getClient().product.findMany({
      where: {
        OR: [
          {
            name_contains: search,
          },
          {
            description_contains: search,
          },
        ],
      },
    });
  }

  async getLatestProduct() {
    return await instance.getClient().product.findMany({
      orderBy: {
        catchDate: "desc", // Mengurutkan berdasarkan catchDate dari yang terbaru ke yang terakhir
      },
    });
  }
}

export default ProductRepository;
