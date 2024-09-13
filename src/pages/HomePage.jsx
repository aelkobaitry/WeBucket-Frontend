import { useEffect } from "react";
import BucketListCarousel from "../components/BucketListCarousel";
import NavBar from "../components/NavBar";

const HomePage = () => {
  useEffect(() => {
    console.log("at home page");
  }, []);

  return (
    <>
      <NavBar />
      <BucketListCarousel />
    </>
  );
};

export default HomePage;
