import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../authentication/Login';
import LogoutButton from '../authentication/Logout';

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  const dropDown = () => {
    setIsVisible(!isVisible)
  }

  const clicked = () => {
    setIsVisible(false)
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-600 p-6 fixed top-0 w-full">
      <div className="flex items-center flex-shrink-0 text-white">
        <Link to="/" className="font-semibold text-2xl tracking-tight">Wellness Tracker</Link>
      </div>
      <div className="block">
        <button onClick={dropDown} className="flex items-center px-4 py-3 mr-2 text-teal-200 border rounded border-green-300 hover:text-white hover:border-white">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      {isVisible ? (
        <div className='w-full block flex-grow items-center'>
          <div className='flex items-center mt-2 justify-between lg:flex-grow mx-auto lg:mx-0'>
            <Link to='/' onClick={clicked} className='nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full'>
              Home
            </Link>
            <Link to='/food' onClick={clicked} className='nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full'>
              Food
            </Link>
            <Link to='/account' onClick={clicked} className='nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full'>
              Account
            </Link>
            <button onClick={clicked} className='nav-link px-8 py-4 bg-green-500 text-green-200 justify-center hover:text-white hover:bg-green-800 flex place-items-center rounded-full'>
              <div className='flex items-center'>
                <LoginButton />
                <LogoutButton />
              </div>
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
