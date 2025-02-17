import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../store/Auth";
import NavBar from "../components/NavBar";
import { getCurrentUser } from "../store/Fetch";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser(setUserData, navigate);
  }, [navigate]);

  const signOut = () => {
    deleteToken();
    navigate("/login");
  };

  return (
    <>
      <NavBar />
      <div className="relative z-10 flex flex-col items-center justify-center">
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
    </>
  );
};

export default ProfilePage;
