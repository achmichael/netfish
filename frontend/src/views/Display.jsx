import React, { useState } from "react";
import SplashScreen from "../components/SplashScreen.jsx";
import LandingPage from "./LandingPage.jsx";

const Display = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  const handleAnimationComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="app">
      {showSplash ? (
        <SplashScreen onAnimationComplete={handleAnimationComplete} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default Display;
