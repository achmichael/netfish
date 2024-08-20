import React from "react";

const ContainerForm = ({ children }) => {
  return (
    <div className="container bg-white p-8 rounded">
      <form className="space-y-6">{children}</form>
    </div>
  );
};

export default ContainerForm;
