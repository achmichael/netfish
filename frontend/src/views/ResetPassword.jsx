import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import FormValidation from "../components/FormValidation.jsx";
import Header from "../components/Header.jsx";
import ContainerForm from "../components/ContainerForm.jsx";
import InputGroup from "../components/InputGroup.jsx";
import { PiLockKeyFill } from "react-icons/pi";
import resetPassword from "../api/resetPassword.js";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const id = params.get("id");

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "password":
        if (!isValidPassword(value.trim())) {
          error =
            "Password harus minimal 8 karakter, mengandung huruf besar, angka, dan karakter khusus";
        }
        break;

        case "confirmPassword":
            if (value.trim() !== data.password.trim()) {
              error = "Password baru dan konfirmasi password harus sama";
            }
            break;
      default:
        break;
    }
    // Pernyataan ini menggunakan fungsi callback yang menerima state errors sebelumnya sebagai argumen (prevErrors).
    // Fungsi ini kemudian mengembalikan objek errors yang baru dengan menduplikasi prevErrors dan memperbarui properti yang sesuai dengan name dengan nilai error yang baru.
    // Ini memastikan bahwa Anda selalu bekerja dengan state errors yang paling mutakhir, bahkan jika ada pembaruan state yang bersamaan.
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((err) => err !== "");

    if (!hasErrors) {
        const result = await resetPassword({ id: id, token: token, newPassword: data.password});
        Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: result.message,
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terdapat kesalahan dalam input data!",
        footer: "Silahkan Coba lagi",
      });
    }
  };

  // melakukan validasi ulang pada confirmpassword setiap kali password berubah
  useEffect(() => {
    if (touched.confirmPassword){
        validateField("confirmPassword", data.confirmPassword);
    }
  }, [data.password]);


  return (
    <FormValidation>
      <Header
        title={"Reset Password"}
        content={"Please enter your new password"}
        titleClassName={"text-2xl font-bold text-primary text-center mb-4"}
        contentClassName={"text-lg text-gray-600 text-center mb-2"}
      />
      <Container
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        errors={errors}
        data={data}
        touched={touched}
      />
    </FormValidation>
  );
};

const Container = ({ handleInputChange, handleSubmit, errors, data, touched }) => {
  return (
    <ContainerForm>
      <InputGroup
        name={"password"}
        error={errors.password}
        value={data.password}
        icon={<PiLockKeyFill />}
        placeholder={"Masukkan password baru anda..."}
        onChange={handleInputChange}
        type={"password"}
        touched={touched.password}
        validateField={(value) => isValidPassword(value)}
      />
      <InputGroup
        name={"confirmPassword"}
        error={errors.confirmPassword}
        value={data.confirmPassword}
        icon={<PiLockKeyFill />}
        placeholder={"Konfirmasi password baru anda..."}
        onChange={handleInputChange}
        type={"password"}
        touched={touched.confirmPassword}
        validateField={(value) => isValidPassword(value)}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark mt-4"
      >
        Reset Password
      </button>
    </ContainerForm>
  );
};

const isValidPassword = (password) => {
    const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{:;.,<>?]).{8,}$/;
    return passwordRegex.test(password);
};

export default ResetPassword;
