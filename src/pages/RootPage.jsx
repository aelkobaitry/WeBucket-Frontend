import logo from "../assets/Logo.svg";
import Footer from "../components/Footer";

const RootPage = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center mt-56 mb-96">
        <img src={logo} className="w-36" alt="WeBucket Logo" />
        <div className="text-[#A778AF] font-bold text-4xl">
          Welcome to WeBucket
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RootPage;
