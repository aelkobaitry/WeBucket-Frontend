/**
 * Represents a Navigation Bar. There are two elements in this nav bar, which are the hamburger menu and profile picture.
 * @returns {JSX.Element}
 * @constructor
 */
export default function NavBar() {

  /**
   * Handles a user click of their profile picture.
   * @param {MouseEvent} event onClick event
   */
  const handleProfileClick = (event) => {
    // This will pull up account/profile data when called
  }

  return (
    <nav className="flex justify-between">
      <img src="src/assets/hamburger-left.svg" alt="hamburger-menu" className="w-10 cursor-pointer duration-300 hover:scale-110" />
      <img src={"src/assets/base-pfp.svg"} alt="profile-picture" className="w-10 cursor-pointer duration-300 hover:scale-110" onClick={handleProfileClick}/>
    </nav>
  );
}