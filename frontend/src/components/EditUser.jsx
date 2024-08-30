import React, { useEffect, useState } from "react";
import Form from "./Form.jsx";
import FormValidation from "./FormValidation.jsx";
import Header from "./Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import getUserById from "../api/getUserById.js";
import Loader from "./LazyLoader.jsx";
import updateUser from "../api/updateUser.js";
import { error, success } from "../Config/Response.js";

const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserById(
        id,
        JSON.parse(localStorage.getItem("data")).token
      );
      console.log(result);
      if (result.success) {
        setUserData(result.data);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData) => {
    const dataToUpdate = {
      id: id,
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    if (formData.password) {
      dataToUpdate.password = formData.password;
    }

    const result = await updateUser(
      dataToUpdate,
      JSON.parse(localStorage.getItem("data")).token
    );

    if (result.success) {
      success({
        title: "Success",
        message: result.message,
        confirmButtonText: "Okay",
      });
      navigate("/dashboard-admin");
    } else {
      error({
        title: "Error",
        message: result.errors,
        confirmButtonText: "Try again",
      });
    }
  };

  return (
    <FormValidation>
      <Header
        title={"Edit User"}
        content={"Plese fill fields user data for edit the data"}
        titleClassName="text-2xl font-bold text-primary text-center mb-4"
        contentClassName="text-lg text-gray-600 text-center mb-2"
      />
      <Form isEdit={true} initialData={userData} handleSubmit={handleSubmit} />
    </FormValidation>
  );
};

export default EditUser;
