import { Link } from "react-router-dom";

/**
 * Represents the footer of the application.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Footer() {
  return (
    <footer className="relative z-10 m-4 bg-transparent rounded-lg shadow dark:bg-gray-800">
      <div className="w-screen max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © 2024{"  "}
          <Link to="/" className="hover:underline">
            WeBucket
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <Link to="/team" className="hover:underline me-4 md:me-6">
              The Team
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline me-4 md:me-6">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
