import logo from "../assets/Logo.svg";
import profilePic from "../assets/base-pfp.svg";
import { Link, useNavigate } from "react-router-dom";

/**
 * Represents a Navigation Bar. There are two elements in this nav bar, which are the hamburger menu and profile picture.
 * @returns {JSX.Element}
 * @constructor
 */
export default function NavBar() {
  const navigate = useNavigate();

  /**
   * Handles a user click of their profile picture.
   * @param {MouseEvent} event onClick event
   */
  const handleProfileClick = (event) => {
    navigate("/profile");
  };

  return (
    <nav className="fixed top-0 flex justify-between w-full start-0">
      <Link to="/" className="flex items-center">
        <img src={logo} className="w-14 mt-11 ml-11" alt="WeBucket Logo" />
      </Link>
      <img
        src={profilePic}
        alt="profile-picture"
        className="mt-10 duration-300 cursor-pointer w-14 mr-11 hover:scale-110"
        onClick={handleProfileClick}
      />
    </nav>
  );
}
