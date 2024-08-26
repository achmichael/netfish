import ResponseError from "../Config/Error.js";
import Product from "../Models/Product.js";
import ProductRepository from "../Repository/ProductRepository.js";

class ProductService {
  
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async addProduct(product) {
    const {
      name,
      description,
      price,
      image,
      weight,
      catchDate = null,
      isProcessed = false,
      processType = null,
      stock,
    } = product;

    const newProduct = new Product(
      name,
      description,
      parseFloat(price),
      image,
      parseFloat(weight),
      catchDate,
      isProcessed,
      processType,
      parseFloat(stock)
    );

    return await this.productRepository.createProduct(newProduct);
  }

  async updateProduct(product_id, product) {
    await this.checkExistProduct(product_id);
    const {
      name,
      description,
      price,
      image,
      weight,
      catchDate = null,
      isProcessed = false,
      processType = null,
      stock,
    } = product;

    const updatedProduct = new Product(
      name,
      description,
      price,
      image,
      weight,
      catchDate,
      isProcessed,
      processType,
      stock
    );
    return await this.productRepository.updateProduct(
      product_id,
      updatedProduct
    );
  }

  async deleteProduct(product_id) {
    await this.checkExistProduct(product_id);
    return await this.productRepository.deleteProduct(product_id);
  }

  async getProductById(product_id) {
    await this.checkExistProduct(product_id);
    return await this.productRepository.getProductById(product_id);
  }

  async checkExistProduct(product_id) {
    const product = await this.productRepository.getProductById(product_id);
    if (!product) {
      throw new ResponseError(404, "Product not found");
    }
    return true;
  }

  async getProducts () {
    return await this.productRepository.getAllProducts();
  }
}

export default new ProductService();
