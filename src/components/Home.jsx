import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
  useEffect(() => {
    console.log("at home page");
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center text-[#A778AF] font-bold text-3xl pt-4">
        WeBucket Home Page
      </div>
    </>
  );
};

export default Home;
