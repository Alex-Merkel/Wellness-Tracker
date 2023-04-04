import Background from '../assets/images/mountain.jpg'
import Profile from '../authentication/Profile'
import { UserInfo } from '../components/UserInfo'
import { useState } from 'react'

function Account() {

  const [showUserInfo, setShowUserInfo] = useState(false)
  

  const handleCloseUserInfo = () => {
      setShowUserInfo(false);
  }

  const handleShowUserInfo = () => {
      setShowUserInfo(true);
  }

  return (
      <div 
          style={{ backgroundImage: `url(${ Background })`}}
          className='flex justify-center mx-auto bg-cover bg-fixed'
      >
          <div className='flex justify-center place-items-center h-screen w-full'>
              <h3 className='p-5 text-3xl bg-white bg-opacity-60 text-black rounded'>Welcome to your Account</h3>
              <div>
                  {/* <h5><firstName></h5>
                  <h5><lastName></h5>
                  <h5><emailAddress></h5> */}
                  <button className="bg-green-400 mx-2 p-5" onClick={ handleShowUserInfo }>Edit Account Info</button>
              </div>
              {showUserInfo &&
                  <UserInfo showUserInfo={true} onClose={handleCloseUserInfo} />
              }
          </div>
      </div>
  )
}

export default Account