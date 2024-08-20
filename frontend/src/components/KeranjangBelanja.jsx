import React, { useState, useEffect } from "react";
import Cart from "./Cart.jsx";
import { getCartItems, deleteCartItem } from "../api/cartItems.js";
import Swal from 'sweetalert2';

const KeranjangBelanja = () => {

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const handleFetchData = async () => {
      const result = await getCartItems({ token: localStorage.getItem("token") });
      setCartItems(result.data);
    };

    handleFetchData();
  }, []);

  
  const handleRemoveItem = async (cartItemId, index, productId) => {
    try{
      const token = localStorage.getItem('token');
      await deleteCartItem(cartItemId, productId, token);

      const newItems = cartItems.filter((_, i) => i !== index);
      setCartItems(newItems);

      Swal.fire({
        title: "Berhasil",
        text: "Item berhasil dihapus!",
        icon: "success",
        confirmButtonText: "Lanjutkan",
      })
    }catch(error){
      console.log(error);
    } 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary p-6">
      <Cart items={cartItems} onRemoveItem={handleRemoveItem}/>
    </div>
  );
};

export default KeranjangBelanja;
