import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import ProfileCard from "./Profile.jsx"; // Updated the import to match the filename convention

const Navbar = () => {
  const [emailUser, setEmailUser] = useState(null);
  const [nameUser, setNameUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setEmailUser(data?.email);
    setNameUser(data?.name);
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileVisible, setProfileIsVisible] = useState(false);
  const profileButtonRef = useRef(null); // Ref for the profile button

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileCard = () => {
    setProfileIsVisible(!isProfileVisible);
  };

  return (
    <>
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
            <Profile
              onProfileClick={toggleProfileCard}
              profileButtonRef={profileButtonRef}
            />
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
      <ProfileCard
        name={nameUser}
        email={emailUser}
        isVisible={isProfileVisible}
        onClose={toggleProfileCard}
        profileButtonRef={profileButtonRef} // Pass the ref to ProfileCard
      />
    </>
  );
};

const Links = ({ href, label, isActive }) => {
  return (
    <a
      className={`mx-4 my-2 lg:my-0 text-white hover:text-red-500 transition-colors ${
        isActive ? "text-red-700 border-b-2 border-[#ceeb56]" : ""
      }`}
      href={href}
    >
      {label}
    </a>
  );
};

const ListLink = ({ isLargeScreen }) => {
  return (
    <div className="list-link flex flex-col lg:flex-row items-center">
      {!isLargeScreen && <Profile />}
      <Links href={"/dashboard"} label={"Beranda"} />
      <Links href={"/#tentang-kami"} label={"Tentang Kami"} />
      <Links href={"/cart"} label={"Keranjang"} />
      <Links href={"#products"} label={"Belanja Yuk"} />
      <Links href={"#contact"} label={"Kontak"} />
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

const Profile = ({ onProfileClick, profileButtonRef, isProfileVisible }) => {
  return (
    <div className="flex items-center my-4 lg:my-0">
      <button
        onClick={onProfileClick}
        ref={profileButtonRef}
        className={`bg-[#023E8A] text-white py-2 px-4 rounded-full ${
          isProfileVisible ? "bg-slate-800" : ""
        }`}
      >
        Profil Saya
      </button>
    </div>
  );
};

export default Navbar;
