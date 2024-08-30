import React, { useEffect, useState } from "react";
import {
  FcHome,
  FcExport,
  FcBarChart,
  FcBusiness,
  FcLeft,
  FcBusinessman,
} from "react-icons/fc";
import {
  exportExcelForAdmin,
  exportExcelForPartner,
} from "../service/ExportExcel.js";

const Sidebar = ({ isSidebarOpen, handleLogout, isAdmin}) => {
  // const [isPartner, setIsPartner] = useState(false);
  // const role = JSON.parse(localStorage.getItem("data")).role;

  // if (role === "PARTNER") {
  //   setIsPartner(true);
  // }
  //  kode diatas menyebabkan error:
  // 1. setiap kali elemen di render kode diatas akan dijalankan
  // 2. setiap kali setIsPartner dipanggil itu akan memicu render ulang komponen
  // 3. karena kode berada di luar hook atau function ia akan dijalankan setiap kali render terjadi
  // ini menyebabkan looping tidak berujung (error)
  // 1. Komponen di render
  // 2. setIsPartner dipanggil
  // 3. koponen dirender ulang setelah perubahan state
  // 4. kembali ke angka 1
  
  const [isPartner, setIsPartner] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") || "{}");
    setIsPartner(data.role === "PARTNER");
  }, []);

  return (
    <div
      className={`lg:w-[20vw] bg-[#023E8A] lg:static lg:block ${
        isSidebarOpen ? "block" : "hidden"
      } text-white py-5 px-2 lg:h-[100rem] sticky top-0 transition-all duration-500 ease mobile:w-full mobile:h-auto`}
    >
      <ul className="list-none flex p-0 flex-col">
        <SidebarLink href="/dashboard" icon={<FcHome />} label="Dashboard" />
        {isAdmin ? (
          <SidebarLink
            href={"#table"}
            icon={<FcBusinessman />}
            label={"Data Users"}
          />
        ) : (
          <SidebarLink
            href="#chart"
            icon={<FcBarChart />}
            label="Grafik Penjualan"
          />
        )}
        <SidebarLink href="#products" icon={<FcBusiness />} label="Products" />
        <button
          onClick={isPartner ? exportExcelForPartner : exportExcelForAdmin}
        >
          {" "}
          <a className="flex items-center px-4 py-2 hover:bg-blue-700 transition duration-300">
            {<FcExport />} <span className="ml-2">Export Data</span>
          </a>
        </button>

        <button onClick={handleLogout}>
          {" "}
          <a
            href=""
            className="flex items-center px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            {<FcLeft />} <span className="ml-2">logout</span>
          </a>
        </button>
      </ul>
    </div>
  );
};

const SidebarLink = ({ href, icon, label }) => (
  <li className="mb-3">
    <a
      href={href}
      className="flex items-center px-4 py-2 hover:bg-blue-700 transition duration-300"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </a>
  </li>
);

export default Sidebar;
