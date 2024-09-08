import { useRouteError } from "react-router-dom";
import Stars from "./Stars";
import logo from "../assets/Logo.svg";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div class="flex flex-col items-center justify-center pt-60 inset-x-0 fixed">
        <img src={logo} class="w-[8%]" alt="logo" />
        <div class="text-[#A778AF] font-bold text-3xl pt-4">
          A bad 404 not found page (great job developer :/)
        </div>
      </div>
      <Stars />
    </div>
  );
}

export default ErrorPage;
