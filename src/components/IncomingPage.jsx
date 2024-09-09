import logo from "../assets/Logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, deleteToken } from "../Auth";

const IncomingPage = () => {
  const [email, setEmail] = useState({ email: "Backend fail" });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching");
    fetch("http://localhost:8000/api/v1/auth/current_user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => setEmail(data))
      .catch((error) => console.error(error));
  }, []);

  const signOut = () => {
    deleteToken();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} className="w-[8%]" alt="logo" />
      <div className="text-[#A778AF] font-bold text-3xl pt-4">
        User email from backend: {email.email}
      </div>
      <button
        className="w-full p-2 mt-4 text-neutral-300 bg-purple-950"
        onClick={signOut}
      >
        signout
      </button>
    </div>
  );
};

export default IncomingPage;
