import React from "react";
import FormCheckOut from "../components/FormCheckOut.jsx";
import { Navbar } from "../components/KeranjangBelanja.jsx";

const CheckOut = () => {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen">
      <Navbar title={"Pesanan Saya"} />
      <FormCheckOut />
    </div>
  );
};

export default CheckOut;
