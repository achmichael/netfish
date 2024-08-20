import React, { useEffect } from "react";
import { motion } from "framer-motion";
import logo from '../assets/new-logo.png';
const SplashScreen = ({ onAnimationComplete }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationComplete();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onAnimationComplete]);
    
  return (
    <motion.div
      className="splash-screen flex items-center justify-center h-screen bg-gradient-to-b from-primary to-secondary"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.5, delay: 1 }}
      onAnimationComplete={onAnimationComplete}
    >
      <img
        src={logo}
        alt="Logo"
        className="min-w-56 min-h-56"
      />
    </motion.div>
  );
};

export default SplashScreen;
