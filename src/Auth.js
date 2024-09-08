import { useLocation, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

export const setToken = (token) => {
  localStorage.setItem("token", token); // make up your own token
};

export const fetchToken = (token) => {
  return localStorage.getItem("token");
};

// export const signOut = () => {
//   localStorage.removeItem("token");
//   navigate("/");
// };

export function RequireToken({ children }) {
  let auth = fetchToken();
  const navigate = useNavigate();

  if (!auth) {
    navigate("/login");
  }

  return children;
}
