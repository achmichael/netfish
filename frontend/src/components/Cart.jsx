import React, { useEffect } from "react";
import payment from "../api/payment.js";

const Cart = ({ items, onRemoveItem }) => {
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
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center">
                  <img
                    className="w-16 h-16 object-cover rounded-lg"
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">
                      {item.productName}
                    </h3>
                    <p className="text-gray-500 text-sm">Rp {item.price}.000</p>
                    <p className="text-gray-500 text-sm">Jumlah barang : {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id, index, item.productId)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  Remove
                </button>
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
            onClick={handleCheckOut}
            className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
