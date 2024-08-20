import React from "react";
import { motion } from "framer-motion";
import { RiQrScan2Line } from "react-icons/ri";
import { FaBitcoin } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import image from "../assets/ikan.jpg";

const BalanceAndCheckIn = () => {
  return (
    <motion.div 
      className="flex-grow py-4 bg-[#023E8A] rounded-3xl text-white h-full lg:flex lg:flex-col" 
      style={{ flexBasis: '55%' }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-none sm:rounded-full p-5 mx-5 lg:mx-10 min-[450px]:rounded-2xl">
        <Balance
          icon={<RiQrScan2Line className="text-xl text-black" />}
          title="Saldo Saya"
          content="Rp.100.000"
        />
        <Balance
          icon={<FaBitcoin className="text-xl text-black" />}
          title={"Check In yukk"}
          content={"176 Coins"}
        />
      </div>
      <Voucher />
    </motion.div>
  );
};

const Image = () => (
  <motion.div
    className="flex-grow mt-4 lg:mt-0 lg:mr-0 w-full lg:mx-5" 
    style={{ flexBasis: '45%' }}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.5 }}
  >
    <img 
      src={image} 
      alt="gambar" 
      className="w-full h-64 lg:h-full rounded-lg object-cover bg-center bg-no-repeat" 
    />
  </motion.div>
);

const Voucher = () => {
  return (
    <motion.div
      className="flex items-center justify-center mt-4 lg:mt-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-bold text-xl text-center mt-2">Voucher & Discount</h3>
      <MdOutlineArrowDropDown className="text-4xl mt-3" />
    </motion.div>
  );
};

const Balance = ({ icon, title, content }) => {
  return (
    <motion.div
      className="flex items-center space-x-2 bg-white rounded-lg px-3 my-2 sm:my-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
      <div>
        <h3 className="font-bold text-[#c5943a]">{title}</h3>
        <p className="text-black">{content}</p>
      </div>
    </motion.div>
  );
};

const Contents = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-between items-stretch lg:h-56 max-w-7xl">
      <BalanceAndCheckIn />
      <Image />
    </div>
  );
};

export default Contents;
