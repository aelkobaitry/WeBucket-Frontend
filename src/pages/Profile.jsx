import logo from "../assets/Logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, deleteToken } from "../Auth";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching profile data");
    fetch("http://localhost:8000/api/v1/auth/current_user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => {
        if (error.message.startsWith("403")) {
          deleteToken();
          navigate("/login");
        } else {
          console.log("Error code: ", error.message);
        }
      });
  }, []);

  const signOut = () => {
    deleteToken();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} className="w-[8%]" alt="logo" />
      {userData === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="text-[#A778AF] font-bold text-3xl pt-4">
            Username: {userData.username}
          </div>
          <div className="text-[#A778AF] font-bold text-3xl pt-4">
            Email: {userData.email}
          </div>
          <div className="text-[#A778AF] font-bold text-3xl pt-4">
            ID: {userData.id}
          </div>
          <div className="text-[#A778AF] font-bold text-3xl pt-4">
            Account created: {userData.created_at.toString()}
          </div>
        </>
      )}
      <button
        className="w-24 p-2 mt-4 text-neutral-300 bg-purple-950"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default Profile;
