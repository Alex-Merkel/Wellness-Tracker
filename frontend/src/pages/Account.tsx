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

const baseURL = "https://quiet-entremet-f8601f.netlify.app/"

function Account() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [showUpdateUserInfo, setShowUpdateUserInfo] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchUserData(user.email);
      setEmailAddress(user.email);
    }
  }, [user]);

  const fetchUserData = async (emailAddress: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false)
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
        <div className="text-3xl mb-8" id='AccountDetailsHeaderText'>Here are your account details:</div>
        {isLoading && <div></div>}
        {isAuthenticated && !isLoading && (
          <div>
            {loading && <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 text-4xl text-white"></div>}
            {!loading && (
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
                      className="px-2 py-1 mx-2 bg-green-500 text-green-200
                      justify-center hover:text-white hover:bg-green-800
                      flex place-items-center rounded-full" 
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
        )}
      </div>
    </div>
  );
}

export default Account;
