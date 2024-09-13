import React from "react";
import logo from "../assets/Logo.svg";

const RootPage = () => {
  return (
    <>
      <div className="flex items-center">
        <img src={logo} className="w-36" alt="WeBucket Logo" />
        <div className="text-[#A778AF] font-bold text-4xl">
          Welcome to WeBucket
        </div>
      </div>
    </>
  );
};

export default RootPage;
