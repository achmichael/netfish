import React, { useState } from "react";
import Form from "../components/Form.jsx";
import verifyEmail from "../api/verifyEmail.js";
import register from "../api/register.js";
import Logo from "../assets/logo.jpg";
import Header from "../components/Header.jsx";
import VerificationCode from "./VerificationCode.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import resendVerificationCode from "../api/verificationCode.js";
import googleAuth from "../api/loginGoogle.js";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const result = await register(data);
    if (result.success) {
      setUserEmail(data.email);
      setIsVerificationStep(true);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: result.message,
        footer:
          "Silakan login menggunakan email dan password yang anda daftarkan.",
      });
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const result = await verifyEmail({
      email: userEmail,
      verification_code: verificationCode,
    });
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: result.message,
        footer:
          "Anda dapat login menggunakan email dan password yang anda daftarkan.",
      });
      navigate("/auth/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.errors,
        footer: "Silakan coba lagi nanti.",
      });
    }
  };

  const handleResendVerificationCode = async () => {
    Swal.fire({
      title: "Kirim ulang kode verifikasi",
      text: "Kami akan mengirimkan kode verifikasi ke email anda.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Kirim",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await resendVerificationCode({ email: userEmail });
        if (result.success) {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: result.message,
            footer:
              "Silahkan cek email anda untuk mendapatkan kode verifikasi.",
          }).then((response) => {
            if (response.isConfirmed) {
              setSuccess(true);
            }
          });
        }
      }
    });
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    const result = await googleAuth(credential);
    if (result.success) {
      setIsVerificationStep(true);
      setUserEmail(result.data.email);
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat register dengan akun google!",
        footer: "Silakan coba lagi nanti.",
      });
    }
  };

  const handleGoogleError = (error) => {
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
        {!isVerificationStep ? (
          <Header
            title="Welcome to Netfish App"
            content="Please Register for your account..."
            titleClassName="text-2xl font-bold text-primary text-center mb-4"
            contentClassName="text-lg text-gray-600 text-center mb-1"
          />
        ) : (
          <Header
            title="Welcome to Netfish App"
            content="Please Enter your verification code..."
            titleClassName="text-2xl font-bold text-primary text-center mb-4"
            contentClassName="text-lg text-gray-600 text-center mb-1"
          />
        )}
        {!isVerificationStep ? (
          <Form
            handleSubmit={handleSubmit}
            onGoogleSuccess={handleGoogleSuccess}
            onGoogleError={handleGoogleError}
          />
        ) : (
          <VerificationCode
            handleVerificationSubmit={handleVerificationSubmit}
            setVerificationCode={setVerificationCode}
            verificationCode={verificationCode}
            handleResendVerificationCode={handleResendVerificationCode}
            success={success}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
