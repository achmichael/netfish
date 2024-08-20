import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import products from "../api/products.js";
import ProductCard from "./ProductCard.jsx";

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
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

  return (
    <div className="container p-5 mx-auto rounded-xl bg-[#023E8A] mt-5 max-w-7xl sm:overflow-x-auto">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : data.length !== 0 ? (
        <div className="flex space-x-4 p-8 w-full overflow-x-auto">
          {data.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: index * 0.1 }} // Delay each card differently
            >
              <ProductCard data={product} />
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
