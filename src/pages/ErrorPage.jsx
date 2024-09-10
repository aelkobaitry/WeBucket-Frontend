import { useRouteError } from "react-router-dom";
import Stars from "../components/Stars";
import logo from "../assets/Logo.svg";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="fixed inset-x-0 flex flex-col items-center justify-center pt-60">
        <img src={logo} className="w-[8%]" alt="logo" />
        <div className="text-[#A778AF] font-bold text-3xl pt-4">
          A bad 404 not found page (great job developer :/)
        </div>
      </div>
      <Stars />
    </div>
  );
}

export default ErrorPage;
