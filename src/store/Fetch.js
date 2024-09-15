import { fetchToken, deleteToken } from "./Auth";
import { useNavigate } from "react-router-dom";

/**
 * Fetches checklists for the user.
 */
export const fetchChecklists = async () => {
  const navigate = useNavigate();
  const response = fetch(
    "http://localhost:8000/api/v1/get_checklists_for_user",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
    }
  );
  if (!response.ok) {
    if (response.status.startsWith("403")) {
      deleteToken();
      navigate("/login");
    } else {
      console.log(`${response.status}: ${response.statusText}`);
    }
  } else {
    return await response.json();
  }
};
