import React, { useState, useEffect } from "react";
import Cart from "./Cart.jsx";
import { getCartItems, deleteCartItem } from "../api/cartItems.js";
import { success } from "../Config/Response.js";

const KeranjangBelanja = () => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const handleFetchData = async () => {
      const result = await getCartItems({
        token: JSON.parse(localStorage.getItem("data"))?.token,
      });

      if (result.success) {
        success({
          title: "Success",
          message: result.message,
          confirmButtonText: "Okay",
        });
        setCartItems(result.data);
      } else {
        error({
          title: "Error",
          message: result.message,
          confirmButtonText: "Okay",
        });
      }
    };

    handleFetchData();
  }, []);

  const handleRemoveItem = async (cartItemId, index, productId) => {
    try {
      const token = localStorage.getItem("token");
      const result = await deleteCartItem(cartItemId, productId, token);

      if (result.success) {
        success({
          title: "Success",
          message: result.message,
          confirmButtonText: "Okay",
        });
        const newItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary p-6">
      <Cart items={cartItems} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default KeranjangBelanja;
