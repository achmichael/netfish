import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const InputGroup = ({
  error,
  value,
  icon,
  onChange,
  placeholder,
  name,
  type,
  touched,
  validateField
}) => {
  const isValid = !error && value !== "" && touched && validateField(value);

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
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {touched && error && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
};


export default InputGroup;