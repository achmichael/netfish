import React, { useEffect } from "react";
import payment from "../api/payment.js";
import { error } from "../Config/Response.js";

const OrderDetail = ({ items, isValid }) => {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_CLIENT_KEY;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function generateOrderId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let orderId = "";
    const length = 10;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters.charAt(randomIndex);
    }

    return orderId;
  }
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckOut = async () => {

    if (!isValid) {
      error({
        title: "error",
        message: "Tolong lengkapi data anda terlebih dahulu",
        confirmButtonText: "Okayyy",
      });
      return;
    }

    try {
      const orderId = generateOrderId();
      const itemDetails = items.map((item) => ({
        name: item.productName,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      }));

      const data = {
        orderId: orderId,
        item_details: itemDetails,
        gross_amount: calculateTotalPrice(),
      };

      const result = await payment(data);

      if (result && result.token) {
        window.snap.pay(result.token);
      } else {
        console.error("Token not received from payment function");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="bg-white rounded-md mt-6">
      <h2 className="font-poppins text-2xl font-semibold mb-4">
        Ringkasan Pesanan
      </h2>
      <ul className="divide-y-2 divide-gray-200">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-4 w-full"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                className="w-16 h-16 object-cover rounded-lg mr-4"
                alt={item.productName}
              />
              <div>
                <h3 className="text-lg">{item.productName}</h3>
                <p className="text-gray-500 text-sm">
                  Rp {item.price}.000 x {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-gray-900">
              Rp {item.price * item.quantity}.000
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-xl font-bold">
          Rp {calculateTotalPrice()}.000
        </span>
      </div>
      <button
        className="w-full mt-5 px-4 py-2 rounded-xl bg-primary text-md text-white font-poppins cursor-pointer hover:text-black transition-colors duration-500"
        onClick={handleCheckOut}
        disabled={!isValid}
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default OrderDetail;
