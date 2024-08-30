import React, { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail.jsx";
import { useLocation } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const FormCheckOut = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState("");
  const location = useLocation(); // digunakan untuk mengambil state yang dikirim dengan menggunakan fungsi navigate
  const { selectedItems } = location.state || { selectedItems: [] };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setName(data?.name || "");
    setEmail(data?.email || "");
  }, []);

  useEffect(() => {
    const requiredFields = ["name", "email", "phone", "address"];

    const allFieldsFilled = requiredFields.every(
      (field) => data[field]?.trim() !== ""
    );

    const noErrors = Object.values(errors).every(error => error === "");

    setIsValid(allFieldsFilled && noErrors);
  }, [data, errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateData(name, value);
  };

  const validateData = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z]{3,}$/.test(value.trim())) {
          error = "Nama harus diisi minimal 3 huruf";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = "Format email salah";
        }
        break;
      case "phone":
        if (!/^\d{12}$/.test(value.trim())) {
          error = "Nomor telepon harus diisi dan terdiri 12 digit";
        }
        break;
      case "address":
        if (!value.trim()) {
          error = "Alamat harus diisi";
        }
        break;
      default:
        break;
    }
    setErrors((prevError) => ({ ...prevError, [name]: error }));
  };

  return (
    <div className="container mx-auto bg-white p-8 shadow-md rounded-md">
      <h2 className="font-poppins text-2xl font-bold mb-4">
        Informasi Pengiriman
      </h2>
      <Input
        id={"name"}
        label={"Nama"}
        value={data.name}
        error={errors.name}
        touched={touched.name}
        handleInputChange={handleInputChange}
        placeHolder={name ? name : "Masukkan nama anda..."}
        type={"text"}
        name={"name"}
      />
      <Input
        id={"email"}
        name={"email"}
        value={data.email}
        error={errors.email}
        touched={touched.email}
        handleInputChange={handleInputChange}
        placeHolder={email ? email : "Masukkan email anda..."}
        label={"Email"}
        type={"email"}
      />

      <Input
        id={"phone"}
        value={data.phone}
        error={errors.phone}
        touched={touched.phone}
        name={"phone"}
        placeHolder={"Masukkan nomor telepon anda"}
        type={"number"}
        handleInputChange={handleInputChange}
        label={"Nomor Telepon"}
      />
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address"
        >
          Alamat
        </label>
        <textarea
          id="address"
          value={data.address}
          name="address"
          placeholder="Masukkan Alamat lengkap anda"
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
        {touched.address && errors.address && (
          <p className="text-red-500 text-xs italic font-poppins">
            {errors.address}
          </p>
        )}
      </div>
      <OrderDetail items={selectedItems} isValid={isValid} />
    </div>
  );
};

const Input = ({
  id,
  label,
  placeHolder,
  type,
  handleInputChange,
  name,
  value,
  error,
  touched,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2 font-poppins"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={handleInputChange}
        placeholder={placeHolder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
      />
      {touched && error && (
        <p className="text-red-500 text-xs italic font-poppins">{error}</p>
      )}
    </div>
  );
};

export default FormCheckOut;
