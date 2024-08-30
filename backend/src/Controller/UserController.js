import UserService from "../Service/UserService.js";
import ResponseError from "../Config/Error.js";

class UserController {
  getDatasUsers = async (req, res, next) => {
    try {
      const data = await UserService.getDatasUsers();
      res.status(200).json({
        message: "Fetched data users successfully",
        data: data,
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  

  deleteUser = async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await UserService.deleteUser(user_id);
      res.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateUserr = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await UserService.updateUser(user_id, req.body);
      res.status(200).json({
        message: "User updated successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const user = await UserService.getDataUserById(req.params.user_id);

      if (!user) {
        return next(new ResponseError(404, "User not found"));
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new UserController();
