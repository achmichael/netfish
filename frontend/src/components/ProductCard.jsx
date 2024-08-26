import React, { useState } from "react";
import { motion } from "framer-motion";
import { addProductToCart } from "../api/cartItems.js";
import Swal from "sweetalert2";
import { success } from "../Config/Response.js";

const ProductCard = ({ data, isPartner }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    try {
      const credential = JSON.parse(localStorage.getItem("data"));
      const token = credential.token;
      const role = credential.role;

      if (role !== "CONSUMER") {
        Swal.fire({
          title: "Oops!",
          text: "Anda harus login sebagai pelanggan untuk menambahkan produk ke keranjang.",
          icon: "error",
          confirmButtonText: "Okay",
        });
        return;
      }
      try {
        const result = await addProductToCart(
          {
            productName: data.name,
            productId: data.id,
            quantity: quantity,
            price: data.price,
            image: data.image,
          },
          token
        );

        if (result.success) {
          success({
            title: "Success",
            message: result.message,
            confirmButtonText: "Okay",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center p-4 rounded-lg shadow-lg bg-white w-60 h-[500px]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="min-w-60 h-32 mb-4">
        <img
          className="w-full h-full object-cover"
          src={data.image || "https://via.placeholder.com/100"}
          alt={data.name || "Product image"}
        />
      </div>
      <h2 className="text-center font-bold text-lg mb-2 flex-grow">
        {data.name || "No name available"}
      </h2>
      <p className="text-center text-gray-700 mb-2 text-sm line-clamp-4">
        {data.description || "No description available"}
      </p>
      <p className="text-center text-gray-600 mb-2">Rp {data.price}.000</p>
      <p className="text-center text-gray-500 text-sm mb-4">
        {data.catchDate
          ? `Tanggal Penangkapan: ${new Date(
              data.catchDate
            ).toLocaleDateString()}`
          : "Tanggal Penangkapan tidak diketahui"}
      </p>
      {!isPartner && (
        <div className="flex items-center mb-4">
          <label className="mr-2 text-gray-600 font-semibold">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 text-center border rounded-md px-2 py-1 text-gray-700"
            min="1"
          />
        </div>
      )}
      {!isPartner && (
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 text-sm mr-1 max-w-[75%]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </motion.div>
  );
};

export default ProductCard;
