import React from "react";
import login from "../api/login.js";
import Form from "../components/Form.jsx";
import Logo from "../assets/logo.jpg"; // Assuming you have a logo image
import Header from "../components/Header.jsx";
import Swal from "sweetalert2";
import googleAuth from "../api/loginGoogle.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      Swal.fire({
        title: "Success",
        text: result.message,
        icon: "success",
        confirmButtonText: "Lanjutkan",
      }).then((response) => {
        if (response.isConfirmed) {
          localStorage.setItem("data", JSON.stringify(result.data));
          if (result.data.role === 'CONSUMER'){
            navigate("/dashboard");
          }else if (result.data.role === 'PARTNER'){
            navigate('/dashboard-partner');
          }else if (result.data.role === "ADMIN"){
            navigate('/dashboard-admin');
          }
        }
      });
    }
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    const result = await googleAuth(credential);
    if (result.success) {
      localStorage.setItem("data", JSON.stringify(result.data));
      navigate("/dashboard");
    }
  };

  const handleGoogleError = (error) => {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Terjadi kesalahan!",
      footer: "Silakan coba lagi nanti.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-primary to-secondary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-32 w-32" />
        </div>
        <Header
          title="Welcome Back"
          content="Please login to your account..."
          titleClassName="text-2xl font-bold text-primary text-center mb-4"
          contentClassName="text-lg text-gray-600 text-center mb-1"
        />
        <Form
          handleSubmit={handleSubmit}
          isLogin={true}
          onGoogleSuccess={handleGoogleSuccess}
          onGoogleError={handleGoogleError}
        />
      </div>
    </div>
  );
};

export default Login;
