import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import products from "../api/products.js";
import ProductCard from "./ProductCard.jsx";
import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Loader from "./LazyLoader.jsx";
const Products = ({ isPartner, isAdmin }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartId, setCartId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true);
      const data = JSON.parse(localStorage.getItem("data"));
      const token = data?.token;
      try {
        const result = await products(token);
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    handleFetchData();
  }, []);


  useEffect(() => {
    // cek jika url mengandung hash #products dan elemen tersebut ada di halaman dashboard
    const scrollToElement = () => {
      const hash = window.location.hash
        ? window.location.hash.substring(1)
        : "";
      if (hash) {
        // const [elementId] = hash.split('?')// setara dengan ekspresi bawah
        const [elementId, queryString] = hash.split("?"); // memisahkan id element jika ada parameter query dan menangkap elemen pertama dengan menggunakan operasi destructing array
        const element = document.getElementById(elementId);
        const params = new URLSearchParams(queryString); // Use URLSearchParams to parse query string

        const cartId = params.get('edit');
        setCartId(cartId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // cek saat pertama kali komponen di render
    scrollToElement();

    // menambahkan event listener untuk hashchange
    window.addEventListener("hashchange", scrollToElement);

    // clean up event listener saat komponen di unmount
    return () => {
      window.removeEventListener("hashchange", scrollToElement);
    };
  }, []);

  return (
    <div
      className={`container p-5 mx-auto rounded-xl ${
        isPartner ? "bg-white shadow-sm shadow-black" : "bg-[#023E8A]"
      } mt-5 max-w-7xl sm:overflow-x-auto`}
      id="products"
    >
      <div className="flex justify-end mb-1">
        {(isPartner || isAdmin) && (
          <button
            onClick={() => navigate("/add-product")}
            className="flex items-center text-white text-sm bg-[#023E8A] rounded-full py-2 px-4"
          >
            <CgAdd className="text-white text-sm mr-2" />
            Tambah Produk
          </button>
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : data.length !== 0 ? (
        <div className="flex space-x-4 p-8 w-full overflow-x-auto">
          {data.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: index * 0.1 }} // Delay each card differently
            >
              <ProductCard
                data={product}
                isPartner={isPartner}
                isAdmin={isAdmin}
                cartId={cartId}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default Products;
