import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import MinorToast from "../components/modals/MinorToast";
import {
  fetchEarlyAccessToken,
  setEarlyAccessToken,
} from "../store/EarlyAccess";

// ADD TO APP

// import { RequireEarlyAccessToken } from "./store/EarlyAccess";
// import EarlyAccessPage from "./pages/AccessPage";

// {
//     path: "early-access",
//     element: (
//       <>
//         <EarlyAccessPage />
//         <Stars />
//         <Toaster />
//       </>
//     ),
//     errorElement: <ErrorPage />,
//   },

function EarlyAccessPage() {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accessCode == "hireStudents!!") {
      setEarlyAccessToken(accessCode);
      navigate("/login");
    } else {
      MinorToast("Error!", "incorrect access code");
    }
  };

  return (
    <div className="relative z-10 items-center justify-center">
      {fetchEarlyAccessToken() ? (
        <Navigate to={"/login"} />
      ) : (
        <form
          className="relative flex flex-col text-xl font-light text-light-purple"
          onSubmit={handleSubmit}
        >
          Do you have an early access code?
          <input
            className="flex p-3 mt-3 bg-transparent border-2 rounded-md w-96 border-purple-950 text-light-purple"
            type="text"
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter code"
          />
          <button
            className="w-full p-2 mt-4 text-neutral-300 bg-purple-950"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default EarlyAccessPage;
