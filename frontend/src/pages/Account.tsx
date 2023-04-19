import Background from '../assets/images/mountain.jpg'
import UserInfo from '../components/UserInfo';
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import UpdateUserInfo from '../components/UpdateUserInfo';

interface UserData {
  isReturningUser?: boolean;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
}

const baseURL = "http://localhost:5000/"

function Account() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [showUpdateUserInfo, setShowUpdateUserInfo] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetchUserData(user.email);
      setEmailAddress(user.email);
    }
  }, [user]);

  const fetchUserData = async (emailAddress: string) => {
    try {
      const res = await fetch(`${baseURL}checkuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailAddress })
      });
      const data = await res.json();
      if (res.ok && data.isReturningUser) {
        setIsReturningUser(true);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      } 
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="flex justify-center mx-auto bg-cover bg-fixed"
    >
      <div className="flex flex-col h-screen justify-center items-center">
        <h3 className="p-5 text-4xl font-bold mb-12 bg-white bg-opacity-60 text-black rounded">
          Welcome back!
        </h3>
        <div className="text-3xl mb-8">Here are your account details:</div>
        {isLoading && <div>Loading ...</div>}
        {isAuthenticated && !isLoading && (
          <div>
            {isReturningUser ? (
              <div className="flex flex-col justify-center items-center text-white">
                <div className="flex justify-between" id='AccountText'>
                  <div className="flex flex-col mr-24">
                    <h5 className="text-2xl my-3">First Name:</h5>
                    <h5 className="text-2xl my-3">Last Name:</h5>
                    <h5 className="text-2xl my-3">Email Address:</h5>
                  </div>
                  <div className="flex flex-col items-end">
                    <h5 className="text-2xl my-3">{firstName}</h5>
                    <h5 className="text-2xl my-3">{lastName}</h5>
                    <h5 className="text-2xl my-3">{emailAddress}</h5>
                  </div>
                </div>
                <button 
                  className="px-8 py-4 mt-8 bg-green-500 text-green-200
                  justify-center hover:text-white flex place-items-center
                  rounded-full" 
                  onClick={() => setShowUpdateUserInfo(true)}
                >
                  Update
                </button>
                {showUpdateUserInfo && (
                  <UpdateUserInfo 
                    onClose={() => setIsReturningUser(true)}
                    email={emailAddress} 
                    firstName={firstName} 
                    lastName={lastName} 
                  />
                )}
              </div>
            ) : (
              <UserInfo onClose={() => setIsReturningUser(true)} email={emailAddress} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
