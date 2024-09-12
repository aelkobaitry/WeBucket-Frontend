import { useRouteError } from "react-router-dom";
import Stars from "../components/Stars";
import NavBar from "../components/NavBar";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <NavBar />
      <div className="fixed inset-x-0 flex flex-col items-center justify-center">
        <div className="text-[#A778AF] font-bold text-3xl">
          A bad 404 not found page (great job developer :/)
        </div>
      </div>
      <Stars />
    </>
  );
}

export default ErrorPage;
