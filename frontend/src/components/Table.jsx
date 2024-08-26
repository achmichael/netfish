import React, { useEffect, useState } from "react";
import products from "../api/products.js";
import Loader from "./LazyLoader.jsx";

const Table = ({ onDelete, openEditModal }) => {
  const [dataProducts, setDataProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("data")).token;
      try {
        const result = await products(token);
        setDataProducts(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchData();
  }, []);

  if (!dataProducts || dataProducts.length === 0) {
    return <p className="text-red-500 text-xl">No Products Available</p>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#023E8A] text-white">
            <tr>
              <th className="px-4 py-2 text-left border-r">No</th>
              <th className="px-4 py-2 text-left border-r">Nama Produk</th>
              <th className="px-4 py-2 text-center border-r">Deskripsi</th>
              <th className="px-4 py-2 text-left border-r">Weight</th>
              <th className="px-4 py-2 text-left border-r">Price</th>
              <th className="px-4 py-2 text-left border-r">stock</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataProducts.map((product, index) => (
              <tr
                key={`${product.id}-${index}`}
                className="border-t border-gray-300"
              >
                <td className="px-4 py-2 border-r">{index + 1}</td>
                <td className="px-4 py-2 border-r">{product.name}</td>
                <td className="px-4 py-2 border-r">{product.description}</td>
                <td className="px-4 py-2 border-r">
                  <span>{product.weight}</span>
                </td>
                <td className="px-4 py-2 border-r">{product.price}</td>
                <td className="px-4 py-2 border-r">{product.stock}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
