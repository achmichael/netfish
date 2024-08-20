import React from "react";
import { motion } from "framer-motion";
import { FaTruckFast } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";

const Articles = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-between items-stretch h-auto space-y-5 lg:space-y-0 lg:space-x-5 max-w-7xl">
      <motion.div 
        className="flex-grow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <FreeShipping />
      </motion.div>
      <motion.div 
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <FlashSale />
      </motion.div>
    </div>
  );
};

const FreeShipping = () => {
  return (
    <motion.div
      className="flex-grow py-4 bg-[#023E8A] rounded-3xl h-full w-full flex items-center justify-center relative"
      style={{ flexBasis: "50%" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <FaStar className="text-[#ceeb56] text-3xl absolute top-3 left-10" />
      <FaStar className="text-[#ceeb56] text-3xl absolute top-3 right-10" />
      <FaStar className="text-white text-3xl absolute top-13 left-3" />
      <FaStar className="text-[#ceeb56] text-3xl absolute bottom-3 left-6" />
      <FaStar className="text-[#ceeb56] text-3xl absolute bottom-3 right-6" />
      <FaStar className="text-white text-3xl absolute bottom-12 right-3" />
      <div className="flex items-center justify-center">
        <FaTruckFast className="text-white text-8xl mr-4" />
        <div className="flex flex-col">
          <h3 className="text-4xl md:text-5xl font-poppins text-white text-center">
            FREE
          </h3>
          <h3 className="text-4xl md:text-5xl font-poppins text-[#f2b749]">
            ONGKIR
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const FlashSale = () => {
  return (
    <motion.div
      className="flex-grow py-6 bg-[#023E8A] rounded-3xl h-full w-full flex items-center justify-center"
      style={{ flexBasis: "50%" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Teks "FLASH SALE" */}
      <div className="flex flex-col items-start mr-3">
        <h3 className="text-3xl md:text-4xl font-poppins text-[#f2b749]">
          FLASH
        </h3>
        <h3 className="text-3xl md:text-4xl text-center font-poppins text-white">
          SALE
        </h3>
      </div>

      {/* Ikon Petir */}
      <FaBolt className="text-[#ceeb56] text-5xl md:text-6xl mr-4" />

      {/* Teks "DISCOUNT UP TO 40%" */}
      <div className="flex flex-col items-start">
        <h3 className="text-3xl md:text-4xl font-poppins text-white">
          DISCOUNT
        </h3>
        <h3 className="text-3xl md:text-4xl font-poppins text-[#f2b749]">
          UP TO <span className="text-white">40%</span>
        </h3>
      </div>
    </motion.div>
  );
};

export default Articles;
