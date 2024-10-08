import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const setEarlyAccessToken = (token) => {
  localStorage.setItem("early_access_token", token);
};

export const fetchEarlyAccessToken = () => {
  return localStorage.getItem("early_access_token");
};

export const deleteEarlyAccessToken = () => {
  localStorage.removeItem("early_access_token");
};

export function RequireEarlyAccessToken({ children }) {
  let auth = fetchEarlyAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      console.log("No early access code found");
      navigate("/");
    }
  }, []);

  return children;
}
