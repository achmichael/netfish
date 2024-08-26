import React from "react";
import {
  FcHome,
  FcExport,
  FcBarChart,
  FcBusiness,
  FcLeft,
} from "react-icons/fc";
const Sidebar = ({ isSidebarOpen, handleLogout }) => {

  return (
    <div
      className={`lg:w-[20vw] bg-[#023E8A] lg:static lg:block ${
        isSidebarOpen ? "block" : "hidden"
      } text-white py-5 px-2 lg:h-[100rem] sticky top-0 transition-all duration-500 ease mobile:w-full mobile:h-auto`}
    >
      <ul className="list-none flex p-0 flex-col">
        <SidebarLink href="/dashboard" icon={<FcHome />} label="Dashboard" />
        <SidebarLink
          href="/chart"
          icon={<FcBarChart />}
          label="Grafik Penjualan"
        />
        <SidebarLink href="/products" icon={<FcBusiness />} label="Products" />
        <SidebarLink href="/export" icon={<FcExport />} label="Export Data" />
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
