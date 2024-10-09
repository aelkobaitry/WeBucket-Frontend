import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const fetchToken = () => {
  return localStorage.getItem("token");
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export function RequireToken({ children }) {
  let auth = fetchToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      console.log("No token found");
      navigate("/login");
    }
  }, []);

  return children;
}
