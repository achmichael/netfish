import React, { useState, useEffect } from "react";
import Cart from "./Cart.jsx";
import { getCartItems, deleteCartItem } from "../api/cartItems.js";
import { success, error } from "../Config/Response.js";
import { FaArrowLeftLong } from "react-icons/fa6";

const KeranjangBelanja = () => {

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const handleFetchData = async () => {
      const token = JSON.parse(localStorage.getItem("data"))?.token;
      const result = await getCartItems(token);
      if (result.success) {
        setCartItems(result.data);
      } else {
        error({
          title: "Error",
          message: result.errors,
          confirmButtonText: "Okay",
        });
      }
    };
    handleFetchData();
  }, []);

  const handleRemoveItem = async (cartItemId, index, productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("data"))?.token;
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
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary">
      <Navbar title={"Keranjang Saya"} />
      <Cart items={cartItems} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export const Navbar = ({ title }) => {
  return (
    <div className="bg-transparent text-white p-7">
      <div className="flex items-center">
        <FaArrowLeftLong
          onClick={() => history.back()}
          className="text-sm lg:text-lg cursor-pointer hover:text-black"
        />
        <h1 className="ml-3 text-base font-poppins">{title}</h1>
      </div>
    </div>
  );
};
export default KeranjangBelanja;
