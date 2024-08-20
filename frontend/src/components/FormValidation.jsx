import React from "react";
import Logo from "../assets/logo.jpg";

const FormValidation = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-32 w-32" />
        </div>
        {children}
      </div>
    </div>
  );
};
export default FormValidation;
