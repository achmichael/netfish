import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import Header from "../components/Header.jsx";
import Swal from "sweetalert2";
import forgotPassword from "../api/forgotPassword.js";
import FormValidation from "../components/FormValidation.jsx";
import InputGroup from "../components/InputGroup.jsx";
import ContainerForm from "../components/ContainerForm.jsx";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    setTouched(true);
    validateData(name, value);
  };

  const validateData = (name, value) => {
    switch (name) {
      case "email":
        if (!isValidEmail(value.trim())) {
          setError("Format email harus valid contoh (example@gmail.com)");
        } else {
          setError("");
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!error && isValidEmail(email) && email.trim() !== "") {
      const result = await forgotPassword({ email: email });
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
    } else {
      Swal.fire({
        title: "Oops",
        text: error,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <FormValidation>
      <Header
        title={"Reset Password"}
        content={"Please enter your email"}
        titleClassName={"text-2xl font-bold text-primary text-center mb-4"}
        contentClassName={"text-lg text-gray-600 text-center mb-2"}
      />
      <Container
        error={error}
        email={email}
        icon={<MdOutlineEmail />}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        touched={touched}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
      >
        Reset Password
      </button>
    </FormValidation>
  );
};

const Container = ({ error, email, icon, onChange, touched }) => {
  return (
    <ContainerForm>
      <InputGroup
        error={error}
        value={email}
        icon={icon}
        placeholder={"Masukkan email anda..."}
        name="email"
        onChange={onChange}
        type={"text"}
        touched={touched}
        validateField={(value) => isValidEmail(value)}
      />
    </ContainerForm>
  );
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export default ForgotPassword;
