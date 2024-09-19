import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { fetchToken } from "../store/Auth";
import { loginUser } from "../store/Fetch";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  const login = async () => {
    if (username == null || password == null) {
      return;
    } else {
      const formDetails = new URLSearchParams();
      formDetails.append("username", username);
      formDetails.append("password", password);
      loginUser(formDetails, navigate);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center">
      {fetchToken() ? (
        <Navigate to={"/home"} />
      ) : (
        <form
          className="text-[#A778AF] font-light text-xl relative"
          onSubmit={handleSubmit}
        >
          Login ({username} - {password})
          <div className="grid w-full gap-4 py-2 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="py-2 text-sm">Username</label>
              <input
                className="flex p-3 bg-transparent border-2 rounded-md border-purple-950"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="py-2 text-sm">Password</label>
              <input
                className="flex p-3 bg-transparent border-2 rounded-md border-purple-950"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
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

export default LoginPage;
