import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      <p className="text-white">Loading...</p>
    </div>
  );
};

export default Loader;
