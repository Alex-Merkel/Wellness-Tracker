import Background from '../assets/images/sunsetpic.jpg'
import LoginButton from '../authentication/Login'

function Home() {
  return (
    <div 
        style={{ backgroundImage: `url(${ Background })`}}
        className='flex justify-center mx-auto bg-cover bg-fixed'
    >
        <div className='flex place-items-center h-screen'>
            <h3 className='p-5 text-3xl bg-white bg-opacity-60 text-black rounded'>Welcome to Health</h3>
        </div>

        <div className='flex place-items-center h-screen'>
            <LoginButton/>
        </div>
    </div>
  )
}

export default Home
