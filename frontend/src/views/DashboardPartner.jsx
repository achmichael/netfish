import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { FaBell } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Products from "../components/Products.jsx";
import Grafik from "../components/Grafik.jsx";
import logout from "../api/logout.js";
import DashboardContainer from "../components/DashboardContainer.jsx";
import MainContent from "../components/MainContent.jsx";

const DashboardPartner = () => {
  const [username, setUsername] = useState(null);
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("data"))?.name);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      Swal.fire({
        title: "Success",
        text: result.message,
        icon: "success",
        confirmButtonText: "Okay",
      }).then((response) => {
        if (response.isConfirmed) {
          window.location.href = "/";
        }
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isOpen} />
      <DashboardContainer>
        <Sidebar isSidebarOpen={isOpen} handleLogout={handleLogout} />
        <MainContent>
          <DashboardHeader username={username} />
          <Grafik />
          <Products isPartner={true} />
        </MainContent>
      </DashboardContainer>
    </div>
  );
};

export const DashboardHeader = ({ username }) => {
  return (
    <div className="flex justify-between items-center mb-7 flex-wrap">
      <h1 className="text-2xl text-[#023E8A] my-2 mx-0">
        Selamat Datang, {username}
      </h1>
      <div className="relative">
        <FaBell className="text-xl" />
        <span className="absolute -top-1.5 -right-1.5 bg-[#e74c3c] text-white rounded-[50%] py-0.5 px-[6px] text-xs">
          3
        </span>
      </div>
    </div>
  );
};

export const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className="shadow-md sticky top-0 p-6 z-10 bg-[#023E8A] flex justify-between items-center lg:p-10">
      {" "}
      <div className="flex items-center">
        <img src={logo} alt="" className="video h-11 w-11 rounded-full shadow-xl" />
      </div>
      {/* Icon hamburger menu for mobile view */}
      <div className="lg:hidden">
        {isSidebarOpen ? (
          <FaTimes
            onClick={toggleSidebar}
            className="text-white text-2xl cursor-pointer"
          />
        ) : (
          <FaBars
            onClick={toggleSidebar}
            className="text-white text-2xl cursor-pointer"
          />
        )}
      </div>
      <div className="hidden lg:block">
        <IoSettingsOutline className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default DashboardPartner;
