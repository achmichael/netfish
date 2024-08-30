import React, { useState, useEffect } from "react";
import { DashboardHeader, Navbar } from "./DashboardPartner.jsx";
import Table from "../components/Table.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MainContent from "../components/MainContent.jsx";
import DashboardContainer from "../components/DashboardContainer.jsx";
import datasUsers from "../api/datasUsers.js";
import Products from "../components/Products.jsx";
import Swal from "sweetalert2";
import deleteUser from "../api/deleteUser.js";
import updateUser from "../api/updateUser.js";
import Grafik from "../components/Grafik.jsx";

const DashboardAdmin = () => {
  const [username, setUsername] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [datas, setDataUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("data"))?.name);
    const handleFetchData = async () => {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("data")).token;
      try {
        const result = await datasUsers(token);
        setDataUsers(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchData();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (response) => {
        if (response.isConfirmed) {
          const result = await deleteUser(
            id,
            JSON.parse(localStorage.getItem("data")).token
          );

          if (result.success) {
            Swal.fire({
              title: "Success",
              text: result.message,
              icon: "success",
              confirmButtonText: "Okay",
            }).then(() => {
              setDataUsers(datas.filter((user) => user.id !== id));
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (user) => {
    try {
      const result = await updateUser(
        user,
        JSON.parse(localStorage.getItem("data")).token
      );
      
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          setDataUsers(datas.map((u) => (u.id === user.id ? user : u)));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isOpen} />
      <DashboardContainer>
        <Sidebar
          isSidebarOpen={isOpen}
          handleLogout={handleLogout}
          isAdmin={true}
        />
        <MainContent>
          <DashboardHeader username={username} />
          <Table
            onDelete={handleDelete}
            openEditModal={handleUpdate}
            data={datas}
            isLoading={isLoading}
          />
          <Products isPartner={true} isAdmin={true} />
          <Grafik />
        </MainContent>
      </DashboardContainer>
    </div>
  );
};

export default DashboardAdmin;
