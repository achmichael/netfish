import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-8 lg:p-14 bg-[#023E8A] rounded-xl text-white min-h-96 max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      id="tentang-kami"
    >
      <AboutPhoto />
      <AboutContent />
    </motion.div>
  );
};

export const AboutContent = () => {
  return (
    <motion.div
      className="max-w-xl lg:ml-8 text-center lg:text-left mt-8 lg:mt-0"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="text-3xl mt-2 text-[#c5943a] font-bold">About Us</h1>
      <Paragraf
        content={
          "NETFISH merupakan platform e-commerce yang inovatif dalam bidang perikanan, yang menghubungkan suplier dengan konsumen secara langsung. Platform ini menawarkan kemudahan dalam mengakses informasi terkini dan praktik terbaik mengenai pemasaran ikan yang berkelanjutan, dengan fokus pada penjualan ikan segar dan ikan olahan."
        }
      />
      <Paragraf
        content={
          "Visi kami adalah menjadi pelopor dalam menciptakan sistem pemasaran ikan modern dengan pemanfaatan Platform e-commerce sebagai technopreneurship guna mendorong perekonomian yang berkelanjutan, efisien, dan inovatif. Kami berkomitmen untuk menyediakan informasi yang inklusif dan mudah diakses oleh semua kalangan, serta membangun kolaborasi dengan berbagai institusi untuk memperluas dukungan dan jaringan pengetahuan."
        }
      />
    </motion.div>
  );
};

const Paragraf = ({ content }) => {
  return <p className="text-lg mt-4 text-justify">{content}</p>;
};

const AboutPhoto = () => {
  return (
    <motion.div
      className="w-full lg:w-1/2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <img
        src="https://th.bing.com/th/id/OIP.VR--EHyVIbmR-TdvDBW1igHaE8?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt="About Us"
        className="w-full h-auto max-w-lg rounded-lg mx-auto lg:mx-0"
      />
    </motion.div>
  );
};

export default AboutUs;
