import React from "react";
import Navbar from "../components/Navbar.jsx";
import Contents from "../components/Contents.jsx";
import Articles from "../components/Articles.jsx";
import Products from "../components/Products.jsx";
import AboutUs from '../views/AboutUs.jsx';
import Footer from "../components/Footer.jsx";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen flex flex-col">
      <Navbar />
      <Contents />
      <Articles/>
      <AboutUs/>
      <Products/>
      <Footer/>
    </div>
  );
};

export default Dashboard;
