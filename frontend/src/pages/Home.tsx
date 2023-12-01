import Background from '../assets/images/sunsetpic.jpg'
import LoginButton from '../authentication/Login'
import LogoutButton from '../authentication/Logout'


function Home() {
  return (
    <div 
        style={{ backgroundImage: `url(${ Background })`}}
        className='bg-fixed bg-cover flex flex-col justify-center items-center min-h-screen'
    >
      <div className='max-w-4xl text-center mt-14 md:mt-16 px-4 py-8 md:py-12'>
        <h3 className='w-3/5 mx-auto mt-6 md:mt-12 mb-4 md:mb-6 text-4xl md:text-5xl font-bold bg-white bg-opacity-60 text-black rounded p-3 md:p-5'>Wellness Tracker</h3>
        <p className='mb-4 md:mb-6 text-2xl' id='HomeText'>
          We're thrilled to assist you in taking charge of your health and 
          well-being. Whether you want to familiarize yourself with the 
          nutritional information about specific foods, track the foods you 
          consume, or keep track of your water intake,
          we've got your back. With our easy-to-use interface, you'll be
          well on your way to achieving your wellness objectives in no time!
        </p>
        <div className='flex justify-center w-full max-w-4xl'>
          <div className='w-1/5 px-2 py-1 bg-green-500 text-green-200
                      hover:text-white hover:bg-green-800
                      rounded-full'>
            <LoginButton/>
            <LogoutButton/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home
