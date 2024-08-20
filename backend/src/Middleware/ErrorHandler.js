import ResponseError from "../Config/Error.js";

const ErrorHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.statusCode)
      .json({
        errors: err.message,
      })
      .end();
    //   Memanggil metode .end() mengakhiri proses respons. Ini secara eksplisit memberitahu server bahwa tidak ada data tambahan yang akan dikirim.
  } else {
    res
      .status(500)
      .json({
        error: "Internal Server Error",
      })
      .end();
  }
};

export default ErrorHandler;
