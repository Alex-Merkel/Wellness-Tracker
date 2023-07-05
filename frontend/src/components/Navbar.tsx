import { useState } from 'react'
import { Link } from 'react-router-dom'
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
      <div className="block md:hidden">
        <button
          onClick={dropDown}
          className="flex items-center px-4 py-3 mr-2 text-teal-200 border rounded border-green-300 hover:text-white hover:border-white"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="w-full block md:flex md:items-center md:w-auto">
        {isVisible || !isVisible ? (
          <div className="flex flex-col md:flex-row md:items-center">
            <Link
              to="/"
              onClick={hideDropdown}
              className="nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full my-2 md:my-0 mx-2"
            >
              Home
            </Link>
            <Link
              to="/food"
              onClick={hideDropdown}
              className="nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full my-2 md:my-0 mx-2"
            >
              Tracker
            </Link>
            <Link
              to="/account"
              onClick={hideDropdown}
              className="nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full my-2 md:my-0 mx-2"
            >
              Account
            </Link>
            <button
              onClick={hideDropdown}
              className="nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full my-2 md:my-0 mx-2"
            >
              <div className="flex items-center">
                <LoginButton />
                <LogoutButton />
              </div>
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar
