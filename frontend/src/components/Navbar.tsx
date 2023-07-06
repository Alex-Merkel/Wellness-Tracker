import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../authentication/Login';
import LogoutButton from '../authentication/Logout';

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  const dropDown = () => {
    setIsVisible((prevState) => !prevState);
  };

  const hideDropdown = () => {
    setIsVisible(false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-600 p-6 fixed top-0 w-full z-10">
      <div className="flex items-center flex-shrink-0 text-white">
        <Link to="/" className="font-semibold text-2xl tracking-tight">
          Wellness Tracker
        </Link>
      </div>
      <div className="md:hidden">
        <button
          onClick={dropDown}
          className="navbar-toggler flex items-center px-4 py-3 mr-2 text-teal-200 border rounded border-green-300 hover:text-white hover:border-white"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className={`w-full md:flex md:items-center md:w-auto ${isVisible ? 'block' : 'hidden'}`}>
        <div className="flex flex-col md:flex-row md:items-center" id="navmenu">
          <Link
            to="/"
            onClick={hideDropdown}
            className="nav-link text-green-200 justify-center hover:text-white flex my-2 md:my-0 mx-10"
          >
            Home
          </Link>
          <Link
            to="/food"
            onClick={hideDropdown}
            className="nav-link text-green-200 justify-center hover:text-white flex my-2 md:my-0 mx-10"
          >
            Tracker
          </Link>
          <Link
            to="/account"
            onClick={hideDropdown}
            className="nav-link text-green-200 justify-center hover:text-white flex my-2 md:my-0 mx-10"
          >
            Account
          </Link>
          <button
            onClick={hideDropdown}
            className="nav-link text-green-200 justify-center hover:text-white flex my-2 md:my-0 mx-10"
          >
            <div className="flex items-center">
              <LoginButton />
              <LogoutButton />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
