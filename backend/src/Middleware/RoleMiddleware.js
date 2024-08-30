import ResponseError from "../Config/Error.js";

class RoleMiddleware
{
    // Rest parameter (dalam bentuk ...allowedRoles) memungkinkan Anda untuk menerima sejumlah argumen yang tidak terbatas sebagai sebuah array. Dalam konteks fungsi authorizeRole, ini memungkinkan Anda untuk melewatkan satu atau lebih peran yang diizinkan ke fungsi tersebut.
    authorizeRole = (...allowedRoles) => {
        return (req, res, next) => {
          const userRole = req.user.data.role; //mengambil data role dari req.user.data.role yang tersimpan pada payload token jwt

          if (!allowedRoles.includes(userRole)) {
            return next(
              new ResponseError(
                403,
                "Forbidden. You are not authorized to access this resource."
              )
            );
          }
          next();
        };
      };
}

export default new RoleMiddleware();