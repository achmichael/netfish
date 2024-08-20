import React, { useEffect, useState } from "react";
import { PiLockKeyFill } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCheck, FaUser } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton.jsx";
import Swal from "sweetalert2";
import GoogleProvider from "./GoogleProvider.jsx";
import { Link } from "react-router-dom";

const Form = ({
  handleSubmit,
  isLogin = false,
  onGoogleSuccess,
  onGoogleError,
}) => {
  const navigate = useNavigate();

  const [data, setData] = useState(
    isLogin
      ? {
          email: "",
          password: "",
        }
      : {
          name: "",
          email: "",
          password: "",
          rePassword: "",
          role: "",
        }
  );

  const [touched, setTouched] = useState(
    isLogin
      ? {
          email: false,
          password: false,
        }
      : {
          name: false,
          email: false,
          password: false,
          rePassword: false,
          role: false,
        }
  );

  const [errors, setErrors] = useState(
    isLogin
      ? {
          email: "",
          password: "",
        }
      : {
          name: "",
          email: "",
          password: "",
          rePassword: "",
          role: "",
        }
  );

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const requiredFields = isLogin ? ['email', 'password'] : ['name', 'email', 'password', 'rePassword', 'role'];
    const allFieldsFilled = requiredFields.every(
      (field) => data[field].trim() !== ""
    );
    
    const noErrors = requiredFields.every(
      (field) => errors[field].trim() === ""
    );

    setIsFormValid(allFieldsFilled && noErrors);
  }, [data, errors, isLogin]);

  const handleInputChange = (name, value) => {
    setData({ ...data, [name]: value });
    setTouched({ ...touched, [name]: true });
    validateData(name, value);
  };

  const validateData = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!/^[a-zA-Z]{6,}$/.test(value.trim())) {
          error = "Nama harus diisi minimal 6 huruf";
        }
        break;
      case "email":
        if (!isValidEmail(value.trim())) {
          error = "Format email tidak valid";
        }
        break;
      case "password":
        if (
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
            value.trim()
          )
        ) {
          error =
            "Password harus minimal 8 karakter, mengandung huruf besar, angka, dan karakter khusus";
        }
        break;
      case "rePassword":
        if (value.trim() !== data.password) {
          error = "Password tidak cocok";
        }

        if (
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
            value.trim()
          )
        ) {
          error =
            "Confirm password harus minimal 8 karakter, mengandung huruf besar, angka, dan karakter khusus";
        }
        break;
      case "role":
        if (!["CONSUMER", "PARTNER", "ADMIN"].includes(value)) {
          error = "Role tidak valid. Pilihan yang tersedia: CONSUMER, PARTNER, ADMIN";
        }
        break;
      default:
        break;
    }
    
    setErrors({ ...errors, [name]: error });
  };

  const googleButtonText = isLogin ? "signin_with" : "continue_with";

  const onSubmit = (e) => {
    e.preventDefault();

    const requiredFields = isLogin ? ['email', 'password'] : ['name', 'email', 'password', 'rePassword', 'role'];
    const hasErrors = requiredFields.some(field => errors[field] !== '');
    
    if (!hasErrors) {
      handleSubmit(data);
    } else {
      const errorMessages = requiredFields
        .filter(field => errors[field] !== "")
        .map(field => errors[field]);

      const errorMessage = errorMessages.join("<br>");
      
      if (errorMessage) {
        Swal.fire({
          title: "Oopss",
          html: errorMessage,
          icon: "error",
          footer: "Silakan coba lagi...",
          confirmButtonText: "Okay",
        });
      } else {
        Swal.fire({
          title: "Oops",
          text: "Terjadi kesalahan silahkan periksa lagi input anda",
          icon: "error",
          footer: "Silakan coba lagi...",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  return (
    <GoogleProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="container">
        <form onSubmit={onSubmit} className="space-y-6">
          {!isLogin && (
            <InputGroup
              icon={<FaUser />}
              name={"name"}
              value={data.name}
              touched={touched.name}
              error={errors.name}
              placeholder={"Masukkan Nama anda disini..."}
              onChange={handleInputChange}
            />
          )}
          <InputGroup
            name={"email"}
            icon={<MdOutlineEmail />}
            placeholder={"Masukkan Email Anda..."}
            value={data.email}
            touched={touched.email}
            error={errors.email}
            onChange={handleInputChange}
          />
          <InputGroup
            name={"password"}
            touched={touched.password}
            icon={<PiLockKeyFill />}
            placeholder={"Masukkan password anda..."}
            value={data.password}
            error={errors.password}
            onChange={handleInputChange}
            type="password"
          />
          {!isLogin && (
            <>
              <InputGroup
                name={"rePassword"}
                icon={<PiLockKeyFill />}
                touched={touched.rePassword}
                error={errors.rePassword}
                placeholder={"Masukkan ulang password anda..."}
                value={data.rePassword}
                onChange={handleInputChange}
                type="password"
              />
              <SelectGroup
                name={"role"}
                value={data.role}
                touched={touched.role}
                error={errors.role}
                onChange={handleInputChange}
              />
            </>
          )}
          <Button
            className={
              "w-full py-2 px-4 bg-gradient-to-b from-primary to-secondary hover:bg-maroon-600 text-white font-bold rounded"
            }
            label={isLogin ? "Masuk" : "Daftar"}
            disabled={!isFormValid}
          />
          {isLogin && (
            <div className="text-center py-2 px-4">
              <p className="text-black">
                Anda lupa password?
                <Link to={'/forgot-password'} target="_blank" className="text-blue-500 font-semibold">
                  {" "}
                  Klik disini
                </Link>
              </p>
            </div>
          )}
        </form>
        <div className="flex justify-center mt-2">
          <GoogleButton
            onSuccess={onGoogleSuccess}
            onError={onGoogleError}
            className="google-auth-button"
            text={googleButtonText}
          />
        </div>
        <div className="text-center mt-2">
          <p>
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <a
              href={isLogin ? "/register" : "/auth/login"}
              className="text-blue-500 font-semibold"
            >
              {isLogin ? "Daftar di sini" : "Masuk di sini"}
            </a>
          </p>
          <div className="text-center py-2 px-4">
            Informasi ini akan disimpan dengan aman sesuai{" "}
            <a
              href="https://policies.google.com/"
              target="_blank"
              className="text-blue-500"
            >
              <p className="font-semibold">
                Ketentuan Layanan & Kebijakan Privasi
              </p>
            </a>
          </div>
        </div>
      </div>
    </GoogleProvider>
  );
};

const InputGroup = ({
  icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  touched,
}) => {
  const isValid = error === "" && value !== ""; // Only valid if there's no error and the value is not empty

  const criterias = {
    name: "Nama minimal 6 huruf",
    email: "Format email tidak valid",
    password:
      "Password minimal 8 karakter, mengandung huruf besar, angka, dan karakter khusus",
    rePassword: "Password tidak cocok",
    role: "Pilih role yang tersedia",
  };

  const iconStyle = error
    ? "text-red-500"
    : isValid
    ? "text-green-500"
    : "text-gray-400";
  const iconElement = error ? (
    <MdOutlineErrorOutline />
  ) : isValid ? (
    <FaCheck />
  ) : (
    icon
  );

  return (
    <div className="w-full">
      <div className="flex items-center border-b-2 py-2">
        <span className={`${iconStyle} text-xl mr-2`}>{iconElement}</span>
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        />
      </div>
      {touched && error && (
        <p className="text-red-500 text-xs italic">{criterias[name]}</p>
      )}
    </div>
  );
};

const SelectGroup = ({ name, value, onChange, error, touched }) => {
  const isValid = error === "" && value !== ""; // Only valid if there's no error and the value is not empty

  const iconStyle = error
    ? "text-red-500"
    : isValid
    ? "text-green-500"
    : "text-gray-400";
  const iconElement = error ? (
    <MdOutlineErrorOutline />
  ) : isValid ? (
    <FaCheck />
  ) : (
    <FaUser />
  );

  return (
    <div className="w-full">
      <div className="flex items-center border-b-2 py-2">
        <span className={`${iconStyle} text-xl mr-2`}>{iconElement}</span>
        <select
          className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        >
          <option value="" disabled>
            Pilih role anda...
          </option>
          <option value="CONSUMER">Consumer</option>
          <option value="PARTNER">Partner</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      {touched && error && (
        <p className="text-red-500 text-xs italic">{error}</p>
      )}
    </div>
  );
};

const Button = ({ className, label, disabled }) => (
  <button
    className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    type="submit"
    disabled={disabled}
  >
    {label}
  </button>
);

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export default Form;
