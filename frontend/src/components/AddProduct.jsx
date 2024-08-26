import React, { useState } from "react";
import ContainerForm from "./ContainerForm.jsx";
import FormValidation from "./FormValidation.jsx";
import Header from "./Header.jsx";
import InputGroup from "./InputGroup.jsx";
import ImageUpload from "./ImageUpload.jsx";
import addProduct from "../api/addProduct.js";
import Loader from "./LazyLoader.jsx";
import uploadImage from "../api/uploadImage.js";
import { FaUser } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaWeightScale } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { error, success } from "../Config/Response.js";
import { useNavigate } from "react-router-dom";

const validateName = (name) => name.trim() !== "" && name.length < 50;
const validateDescription = (description) =>
  description.trim() !== "" && description.length < 190;
const validatePositiveNumber = (value) => !isNaN(value) && Number(value) > 0;

const AddProduct = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    weight: "",
    stock: "",
  });

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    weight: "",
    stock: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    weight: false,
    stock: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateData(name, value);
  };

  const handleImageChange = (event) => {
    // mengambil file pertama
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateData = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!validateName(value)) {
          error = "Name must be less than 50 characters and cannot be empty";
        }
        break;
      case "description":
        if (!validateDescription(value)) {
          error =
            "Description must be less than 190 characters and cannot be empty";
        }
        break;
      case "price":
      case "weight":
      case "stock":
        if (!validatePositiveNumber(value)) {
          error = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must be a positive number`;
        }
        break;
      default:
        break;
    }
    setErrors((prevError) => ({ ...prevError, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((err) => err !== "");

    if (!hasErrors) {
      if (image) {
        setIsLoading(true);
        try {
          const uploadResult = await uploadImage(image);
          if (uploadResult.success) {
            const result = await addProduct({
              token: JSON.parse(localStorage.getItem("data")).token,
              product: { ...data, image: uploadResult.data },
            });
            if (result) {
              if (result.success) {
                Swal.fire({
                  title: "Success",
                  text: result.message,
                  icon: "success",
                  confirmButtonText: "Okay",
                }).then(() => {
                  // mereset ulang semua state agar field kosong
                  setData({
                    name: "",
                    description: "",
                    price: "",
                    weight: "",
                    stock: "",
                  });
                  setErrors({
                    name: "",
                    description: "",
                    price: "",
                    weight: "",
                    stock: "",
                  });
                  setTouched({
                    name: false,
                    description: false,
                    price: false,
                    weight: false,
                    stock: false,
                  });
                  setImage(null);
                  setPreview(null);
                  navigate("/dashboard-partner");
                });
              }
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        error({
          title: "Error",
          message: "Please select an image for the product",
          confirmButtonText: "Okay",
        });
        return;
      }
    }
  };

  return (
    <FormValidation>
      <Header
        title="Add Product"
        content="please fill in the product fields"
        titleClassName="text-2xl font-bold text-primary text-center mb-4"
        contentClassName="text-lg text-gray-600 text-center mb-2"
      />
      <Container
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        errors={errors}
        data={data}
        touched={touched}
        validateName={validateName}
        validateDescription={validateDescription}
        validatePositiveNumber={validatePositiveNumber}
        image={image}
        preview={preview}
        handleImageChange={handleImageChange}
        isLoading={isLoading}
      />
    </FormValidation>
  );
};

const Container = ({
  handleInputChange,
  handleSubmit,
  errors,
  data,
  touched,
  validateName,
  validateDescription,
  validatePositiveNumber,
  image,
  preview,
  handleImageChange,
  isLoading,
}) => (
  <ContainerForm>
    <InputGroup
      name="name"
      error={errors.name}
      value={data.name}
      icon={<FaUser />}
      placeholder="Masukkan nama produk disini..."
      onChange={handleInputChange}
      type="text"
      touched={touched.name}
      validateField={validateName}
    />
    <InputGroup
      name="description"
      error={errors.description}
      value={data.description}
      icon={<TbFileDescription />}
      touched={touched.description}
      placeholder="Deskripsi singkat produk anda..."
      onChange={handleInputChange}
      validateField={validateDescription}
      type="text"
    />
    <InputGroup
      name="price"
      error={errors.price}
      touched={touched.price}
      value={data.price}
      icon={<IoPricetagsOutline />}
      placeholder="Masukkan harga produk anda..."
      onChange={handleInputChange}
      type="number"
      validateField={validatePositiveNumber}
    />
    <InputGroup
      name="weight"
      error={errors.weight}
      value={data.weight}
      touched={touched.weight}
      icon={<FaWeightScale />}
      placeholder="Masukkan berat produk anda..."
      onChange={handleInputChange}
      type="number"
      validateField={validatePositiveNumber}
    />
    <InputGroup
      name="stock"
      error={errors.stock}
      touched={touched.stock}
      value={data.stock}
      icon={<AiOutlineStock />}
      placeholder="Masukkan stock produk anda..."
      onChange={handleInputChange}
      validateField={validatePositiveNumber}
      type="number"
    />
    <ImageUpload
      image={image}
      preview={preview}
      handleImageChange={handleImageChange}
    />
    <button
      type="submit"
      onClick={handleSubmit}
      className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark mt-4"
    >
      {isLoading ? <Loader /> : "Add Product"}
    </button>
  </ContainerForm>
);

export default AddProduct;
