import ResponseError from "../Config/Error.js";
import RetailOrderRepository from "../Repository/RetailOrderRepository.js";
import RetailOrder from "../Models/RetailOrder.js";
import ProductRepository from "../Repository/ProductRepository.js";

class RetailOrderService {
  constructor(retailOrderRepository, productRepository) {
    this.retailOrderRepository =
      retailOrderRepository || new RetailOrderRepository();
    this.productRepository = productRepository || new ProductRepository();
  }

  async createRetailOrder(data, userId) {
    this.checkUserId(userId);

    const { productId, quantity, totalPrice } = data;

    const product = await this.checkProduct(productId);

    this.checkStockProduct(quantity, product.stock);

    const updatedStock = product.stock - quantity;

    // setelah pengurangan stock, maka melakukan update product
    await this.productRepository.updateStockProduct(product.id, updatedStock);

    const retailOrder = new RetailOrder(
      userId,
      productId,
      quantity,
      totalPrice
    );

    return await this.retailOrderRepository.createRetailOrder(retailOrder);
  }

  checkUserId(userId) {
    if (!userId) {
      throw new ResponseError(400, "User ID is required");
    }
  }

  checkStockProduct(quantity, stockProduct) {
    if (quantity > stockProduct) {
      throw new ResponseError(400, "Not enough stock for this product");
    }
  }

  async checkProduct(productId) {
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    return product;
  }

  async getAllRetailOrdersByUserId(userId) {
    this.checkUserId(userId);
    return await this.retailOrderRepository.getAllRetailOrdersByUserId(userId);
  }

  async getRetailOrderById(retailOrderId) {
    this.checkId(retailOrderId);
    const retailOrder = await this.retailOrderRepository.getRetailOrderById(
      retailOrderId
    );
    if (!retailOrder) {
      throw new ResponseError(404, "Retail Order not found");
    }
    return retailOrder;
  }

  async updateRetailOrder(retailOrderId, data, userId) {
    this.checkId(retailOrderId);
    await this.checkRetailOrderExist(retailOrderId);

    const { productId, quantity, totalPrice } = data;

    await this.checkProduct(productId);

    const updatedRetailOrder = new RetailOrder(
      userId,
      productId,
      quantity,
      totalPrice
    );

    return await this.retailOrderRepository.updateRetailOrder(
      retailOrderId, // Ensure the ID is passed to the update method
      updatedRetailOrder
    );
  }

  async deleteRetailOrder(retailOrderId) {
    this.checkId(retailOrderId);
    await this.checkRetailOrderExist(retailOrderId);
    return await this.retailOrderRepository.deleteRetailOrder(retailOrderId);
  }

  async getRetailOrdersByProductId(productId) {
    this.checkId(productId);
    await this.checkProduct(productId);
    return await this.retailOrderRepository.getRetailOrdersByProductId(
      productId
    );
  }

  checkId(retailOrderId) {
    if (!retailOrderId) {
      throw new ResponseError(400, "Valid Retail Order ID is required");
    }
  }

  async checkRetailOrderExist(retailOrderId) {
    const retailOrder = await this.retailOrderRepository.getRetailOrderById(
      retailOrderId
    );
    if (!retailOrder) {
      throw new ResponseError(404, "Retail Order not found");
    }
    return retailOrder;
  }
}

export default new RetailOrderService();
