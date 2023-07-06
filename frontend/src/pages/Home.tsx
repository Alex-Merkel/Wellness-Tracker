import Background from '../assets/images/sunsetpic.jpg'
import LoginButton from '../authentication/Login'
import LogoutButton from '../authentication/Logout'

function Home() {
  return (
    <div 
        style={{ backgroundImage: `url(${ Background })`}}
        className='flex justify-center mx-auto bg-cover bg-fixed'
    >
        <div className='flex flex-col items-center justify-center h-screen'>
            <h3 className='mb-28 text-5xl font-bold bg-white bg-opacity-60 text-black rounded p-5'>Wellness Tracker</h3>
            <div className="mb-20 w-4/5 md:w-3/5 lg:w-3/5 xl:w-3/5">
              <p className='text-white text-center text-2xl' id='HomeText'>
                We're thrilled to assist you in taking charge of your health and 
                well-being. Whether you want to familiarize yourself with the 
                nutritional information about specific foods, track the foods you 
                consume, or keep track of your water intake,
                we've got your back. With our easy-to-use interface, you'll be
                well on your way to achieving your wellness objectives in no time!
              </p>
            </div>
            <div 
              className='px-8 py-4 mx-2 bg-green-500 text-green-200
              justify-center hover:text-white hover:bg-green-800
              flex place-items-center rounded-full'>
              <LoginButton/>
              <LogoutButton/>
            </div>
        </div>
    </div>
  )
}

export default Home
