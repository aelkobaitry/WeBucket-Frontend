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
    console.log(event.target);
  }

  return (
    <nav className="nav-bar">
      <div className="left">
        <img src="src/assets/hamburger_left.svg" alt="hamburger-menu" className="hamburger-icon" />
      </div>
      <div className="right">
        <img src={/* Profile Picture */''} alt="profile-picture" className="pfp" onClick={handleProfileClick}/>
      </div>
    </nav>
  );
}