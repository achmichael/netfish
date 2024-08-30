import React from "react";
const DashboardContainer = ({ children }) => {
  return (
    <div className="flex flex-col m-5 bg-white rounded-xl overflow-hidden lg:flex-row shadow-sm shadow-black">
        {children}
    </div>
  );
};

export default DashboardContainer;