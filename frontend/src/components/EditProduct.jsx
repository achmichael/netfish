import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddProduct from "./AddProduct.jsx";
import product from "../api/product.js";
import Loader from "./LazyLoader.jsx";

const EditProduct = () => {

  const { id } = useParams(); // Get the product ID from the route parameter from product cart to edit data product 
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        setIsLoading(true);
        const result = await product(
          id,
          JSON.parse(localStorage.getItem("data")).token
        );

        if (result.success) {
          setData(result.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataProduct();
  }, []);

  return (
    <>{isLoading ? <Loader /> : <AddProduct product={data}></AddProduct>}</>
  );
};

export default EditProduct;
