import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar shadow-md py-4 sticky top-0 bg-primary z-10">
      <div className="container flex items-center justify-between p-5 mx-auto">
        <Logo />
        <div className="hidden lg:flex flex-1 justify-center">
          <ListLink isLargeScreen />
        </div>
        <div className="flex items-center justify-center lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" aria-hidden="true" />
            ) : (
              <FaBars className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex items-center">
          <Profile />
        </div>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden flex flex-col items-center w-full bg-primary transition-all duration-500 ease-in-out`}
      >
        <ListLink />
      </div>
    </div>
  );
};

const Links = ({ href, label, isActive }) => {
  return (
    <Link
      className={`mx-4 my-2 lg:my-0 text-white hover:text-red-500 transition-colors ${
        isActive ? "text-red-700 border-b-2 border-[#ceeb56]" : ""
      }`}
      to={href}
    >
      {label}
    </Link>
  );
};

const ListLink = ({ isLargeScreen }) => {
  return (
    <div className="list-link flex flex-col lg:flex-row items-center">
      {!isLargeScreen && <Profile />}
      <Links href={"/"} label={"Beranda"} />
      <Links href={"/about"} label={"Tentang Kami"} />
      <Links href={"/cart"} label={"Keranjang"} />
      <Links href={"/products"} label={"Belanja Yuk"} />
      <Links href={"/contact"} label={"Kontak"} />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="h-11 w-11 rounded-full shadow-xl" />
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex items-center my-4 lg:my-0">
      <button className="bg-[#023E8A] text-white py-2 px-4 rounded-full">
        Profil Saya
      </button>
    </div>
  );
};

export default Navbar;
