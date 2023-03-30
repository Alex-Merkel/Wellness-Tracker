import Background from '../assets/images/mountain.jpg'
import Profile from '../authentication/Profile'

function Account() {
  return (
    <div 
        style={{ backgroundImage: `url(${ Background })`}}
        className='flex justify-center mx-auto bg-cover bg-fixed'
    >
        <div className='flex place-items-center h-screen'>
            <h3 className='p-5 text-3xl bg-white bg-opacity-60 text-black rounded'>Welcome to your Account</h3>
        </div>

        <div className='flex place-items-center h-screen'>
            <Profile/>
        </div>
    </div>
  )
}

export default Account