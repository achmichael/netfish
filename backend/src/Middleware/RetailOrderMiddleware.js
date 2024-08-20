import ResponseError from "../Config/Error.js";

class RetailOrderMiddleware {
  // Validasi fields RetailOrder
  validateRetailOrderFields = (req, res, next) => {
    const { productId, quantity, totalPrice } = req.body;

    // Memeriksa keberadaan field yang diperlukan
    if (!productId || !quantity || !totalPrice) {
      return next(
        new ResponseError(
          400,
          "productId, quantity, dan totalPrice harus diisi"
        )
      );
    }

    // Validasi tipe data dan nilai
    if (!this.validatePositiveInteger(productId)) {
      return next(
        new ResponseError(400, "productId harus berupa integer positif")
      );
    }

    if (!this.validatePositiveInteger(quantity)) {
      return next(
        new ResponseError(400, "quantity harus berupa integer positif")
      );
    }

    if (!this.validatePositiveNumber(totalPrice)) {
      return next(
        new ResponseError(400, "totalPrice harus berupa angka positif")
      );
    }

    // Jika semua validasi berhasil, lanjutkan ke middleware berikutnya
    next();
  };

  // Validasi integer positif
  validatePositiveInteger = (value) => {
    return Number.isInteger(Number(value)) && Number(value) > 0;
  };

  // Validasi angka positif (termasuk desimal)
  validatePositiveNumber = (value) => {
    return !isNaN(value) && Number(value) > 0;
  };

  // Sanitasi input
  sanitizeInput = (req, res, next) => {
    // Mengonversi input menjadi tipe data yang sesuai
    req.body.productId = Number(req.body.productId);
    req.body.quantity = Number(req.body.quantity);
    req.body.totalPrice = Number(req.body.totalPrice);

    // Membuang field yang tidak diperlukan
    const allowedFields = ["productId", "quantity", "totalPrice"];
    // Mengambil semua key (nama properti) dari objek req.body dan mengembalikan dalam bentuk array. lalu melakukan looping pada setiap key yang diambil 
    Object.keys(req.body).forEach((key) => {

        // kode ini memeriksa apakah kunci tersebut ada dalam array
      if (!allowedFields.includes(key)) {
        // menghapus properti dari objek req.body dengan notasi bracket, yang artinya java script akan mencari nama properti yang nilainya sama dengan variable key
        delete req.body[key];
      }
    });

    next();
  };

  // Validasi otorisasi
  authorizeUser = (req, res, next) => {
    // Pastikan user sudah terautentikasi
    if (!req.user || !req.user.data || !req.user.data.user_id) {
      return next(new ResponseError(401, "Unauthorized"));
    }

    // Anda bisa menambahkan logika tambahan di sini, misalnya memeriksa peran user

    next();
  };

  // Middleware utama untuk RetailOrder
  retailOrderMiddleware = [
    this.authorizeUser,
    this.sanitizeInput,
    this.validateRetailOrderFields,
  ];
}

export default new RetailOrderMiddleware();
