import { useEffect } from "react";
import BucketListCarousel from "../components/BucketListCarousel";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const HomePage = () => {
  useEffect(() => {
    console.log("at home page");
  }, []);

  return (
    <>
      <NavBar />
      <BucketListCarousel />
      <Footer />
    </>
  );
};

export default HomePage;
