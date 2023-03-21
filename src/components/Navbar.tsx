import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);


    const dropDown = () => {
        setIsVisible(!isVisible)
    }

    const clicked = () => {
        setIsVisible(false)
    }


    return (
        <nav className="flex items-center justify-between flex-wrap bg-green-600 p-6 position-fixed">
            <div className="flex items-center flex-shrink-0 text-white">
                <Link to="/" className="font-semibold text-xl tracking-tight">Health</Link>
            </div>
            <div className="block">
                <button
                    onClick={ dropDown }
                    className="flex items-center px-4 py-3 mr-2 text-teal-200
                    border rounded border-green-300 hover:text-white hover:border-white"
                    >
                        <i className="fa-solid fa-bars"></i>
                </button>
            </div>
            {isVisible ? (
                <div className='w-full block flex-grow items-center'>
                    <div className='flex items-center justify-between text-md lg:flex-grow mx-80'>
                        <Link 
                            to='/'
                            onClick={ clicked }
                            className='px-8 py-4 bg-green-500 text-green-200
                            justify-center hover:text-white flex place-items-center
                            rounded-full'
                        >
                            Home
                        </Link>
                        <Link
                            to='/food'
                            onClick={ clicked }
                            className='px-8 py-4 bg-green-500 text-green-200
                            justify-center hover:text-white flex place-items-center
                            rounded-full'
                        >
                            Food
                        </Link>
                        <Link
                            to='#'
                            onClick={ clicked }
                            className='px-8 py-4 bg-green-500 text-green-200
                            justify-center hover:text-white flex place-items-center
                            rounded-full'
                        >
                            List/Cart
                        </Link>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </nav>
    )
}

export default Navbar
