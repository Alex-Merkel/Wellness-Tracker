import Background from '../assets/images/mountain.jpg'
// import Profile from '../authentication/Profile'
import UserInfo from '../components/UserInfo';
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

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
      console.log(emailAddress)
      const res = await fetch(`${baseURL}checkuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailAddress })
      });
      // console.log(res)
      const data = await res.json();
      console.log(data.isReturningUser)
      if (res.ok && data.isReturningUser) {
        setIsReturningUser(true);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      } 
    } catch (error) {
      console.error(error);
    }
  }

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
  };

  

  // const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFirstName(event.target.value);
  // }

  // const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLastName(event.target.value);
  // }


  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="flex justify-center mx-auto bg-cover bg-fixed"
    >
      <div className="flex justify-center place-items-center h-screen w-full">
        <h3 className="p-5 text-3xl bg-white bg-opacity-60 text-black rounded">
          Welcome to your Account
        </h3>
        {isLoading && <div>Loading ...</div>}
        {isAuthenticated && !isLoading && (
          <div>
            {isReturningUser ? (
              <div>
                <h5>{firstName}</h5>
                <h5>{lastName}</h5>
                <h5>{emailAddress}</h5>
                <button className="bg-green-400 mx-2 p-5" onClick={handleCancel}>
                  Cancel
                </button>
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
