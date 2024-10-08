import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
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
          Login
          <div className="grid w-full gap-4 py-2 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="py-2 text-sm text-mainPurple">Username</label>
              <input
                className="flex p-3 bg-transparent border-2 rounded-md text-mainPurple"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="py-2 text-sm text-mainPurple">Password</label>
              <input
                className="flex p-3 bg-transparent border-2 rounded-md border-purple-950 text-mainPurple"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            className={`w-full p-2 mt-4 text-mainPurple text-opacity-100 ${username && password ? "bg-opacity-100" : "bg-opacity-50"}  bg-medium-dark-purple`}
            type="submit"
            disabled={!username || !password}
          >
            Log In
          </button>
          <label class="text-hoverPurple text-xs pb-4 leading-3 mt-2">
            Don't have an account?{" "}
            <Link class="hover:underline" to="/signup">
              Create an account
            </Link>
          </label>
        </form>
      )}
    </div>
  );
}

export default LoginPage;
