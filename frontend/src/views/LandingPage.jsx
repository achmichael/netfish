import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showContent, setShowContent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // Delay to start the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen flex flex-col items-center justify-center">
      <div
        className={`transition-all duration-1000 ease-in-out text-center ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl font-bold text-white">
          Welcome to NETFISH🐋🐋🐋
        </h1>
        <p className="mt-4 text-xl text-white">
          Temukan ikan segar dan produk olahan berkualitas langsung dari tangan
          nelayan kami.
        </p>
        <button onClick={() => navigate('/auth/login')} className="mt-8 bg-red-700 text-white py-2 px-6 rounded-full hover:bg-red-800 transition duration-300">
          Belanja Sekarang
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
