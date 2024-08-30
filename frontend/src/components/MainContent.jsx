import React from "react";
const MainContent = ({ children }) => {
  return <div className="flex-grow p-8 overflow-y-auto">{children}</div>;
};

export default MainContent;
