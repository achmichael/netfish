import Midtrans from "midtrans-client";
import dotenv from "dotenv";
import ResponseError from "../Config/Error.js";

dotenv.config();

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

class PaymentController {

  pay = async (req, res, next) => {
    const { item_details, orderId, gross_amount } = req.body;

    // Calculate the total price based on item_details
    const calculatedGrossAmount = item_details.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Ensure gross_amount is in the same unit as calculatedGrossAmount
    if (calculatedGrossAmount !== gross_amount) {
      console.error("Total price doesn't match with the calculated total price");
      return next(new ResponseError(400, "Total price doesn't match with the calculated total price")); // Use 400 for bad request
    }

    let parameter = {
      item_details: item_details.map(item => ({
        name: item.name,
        price: item.price * 1000, // Convert to the unit expected by Midtrans
        quantity: item.quantity,
      })),
      transaction_details: {
        order_id: orderId,
        gross_amount: gross_amount * 1000, // Convert to the unit expected by Midtrans
      },
    };

    try {
      const token = await snap.createTransactionToken(parameter);
      res.status(200).json({ token: token, redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}` });
    } catch (error) {
      console.error(error);
      next(new ResponseError(500, "Internal Server Error")); // Use 500 for server errors
    }
  };
}

export default new PaymentController();
