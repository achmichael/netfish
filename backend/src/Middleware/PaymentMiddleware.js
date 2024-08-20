import ResponseError from "../Config/Error.js";
import ProductRepository from "../Repository/ProductRepository.js";

class PaymentMiddleware {

  validatePaymentFields = async (req, res, next) => {
    console.log("Validating payment fields:", req.body);

    const { item_details, orderId, gross_amount } = req.body;

    if (!item_details || !orderId || typeof gross_amount === 'undefined') {
      console.error("Data tidak lengkap");
      return next(new ResponseError(404, "Data tidak lengkap"));
    }

    if (!Array.isArray(item_details) || item_details.length === 0) {
      console.error("Item details harus berupa array dan tidak boleh kosong");
      return next(new ResponseError(404, "Item details harus berupa array dan tidak boleh kosong"));
    }

    const productRepository = new ProductRepository();
    let calculatedTotalPrice = 0;

    for (let i = 0; i < item_details.length; i++) {
      const { name, price, quantity, productId } = item_details[i];

      if (!name || !price || !quantity || !productId) {
        console.error(`Data tidak lengkap pada item ke-${i + 1}`);
        return next(new ResponseError(404, `Data tidak lengkap pada item ke-${i + 1}`));
      }

      if (!this.clearWhiteSpace(name)) {
        console.error(`Nama produk pada item ke-${i + 1} tidak boleh mengandung hanya spasi`);
        return next(new ResponseError(404, `Nama produk pada item ke-${i + 1} tidak boleh mengandung hanya spasi`));
      }

      if (
        !this.validateNumber(price) ||
        !this.validateNumber(quantity) ||
        !this.validateNumber(productId)
      ) {
        console.error(`Input price, quantity, dan productId pada item ke-${i + 1} hanya boleh angka`);
        return next(new ResponseError(404, `Input price, quantity, dan productId pada item ke-${i + 1} hanya boleh angka`));
      }

      const product = await productRepository.getProductById(productId);
      if (!product) {
        console.error(`Produk pada item ke-${i + 1} tidak ada`);
        return next(new ResponseError(404, `Produk pada item ke-${i + 1} tidak ada`));
      }

      if (product.stock < quantity) {
        console.error(`Stok produk pada item ke-${i + 1} tidak cukup`);
        return next(new ResponseError(404, `Stok produk pada item ke-${i + 1} tidak cukup`));
      }

      if (product.price != price) {
        console.error(`Harga produk pada item ke-${i + 1} tidak sesuai dengan data yang sudah ada`);
        return next(new ResponseError(404, `Harga produk pada item ke-${i + 1} tidak sesuai dengan data yang sudah ada`));
      }

      calculatedTotalPrice += product.price * quantity;
    }

    if (calculatedTotalPrice !== gross_amount) {
      console.error("Total harga yang dikirim tidak sesuai dengan perhitungan pada server");
      return next(new ResponseError(404, "Total harga yang dikirim tidak sesuai dengan perhitungan pada server"));
    }

    console.log("Validation passed, proceeding to next middleware/controller");
    next();
  };

  validateNumber = (value) => {
    const number = Number(value);

    if (isNaN(number) || number < 0) {
      return false;
    }

    return true;
  };

  clearWhiteSpace = (value) => {
    return value.trim() !== "";
  };
}

export default new PaymentMiddleware();
