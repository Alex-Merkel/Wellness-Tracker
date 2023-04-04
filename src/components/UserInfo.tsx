import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import db from '../database/connection';

interface UserInfoProps {
  showUserInfo?: boolean;
  onClose: () => void;
}

export const UserInfo = ({ showUserInfo, onClose }: UserInfoProps ) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // try {
    //   // Check if user exists in the database
    //   const result = await db.oneOrNone('SELECT * FROM users WHERE email = $1', emailAddress);
    //   if (result) {
    //     // User already exists, update their info
    //     await db.none('UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3', [firstName, lastName, emailAddress]);
    //   } else {
    //     // User doesn't exist, create a new entry
    //     await db.none('INSERT INTO users(first_name, last_name, email) VALUES ($1, $2, $3)', [firstName, lastName, emailAddress]);
    //   }
    //   navigate('/account');
    // } catch (err) {
    //   console.error(err);
    // }
  };
  
  if ( !showUserInfo ) return (<></>)
  return (
    <div
      onClick={ handleClose }
      className='fixed w-full h-full flex overflow-auto
      justify-center align-middle bg-gray-300 bg-opacity-90'
    >
      <div
        className='max-w-600px w-3/5 fixed flex z-1 m-64 p-5 bg-white shadow-xl rounded'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className='flex justify-center w-full'>
          <form className='flex flex-col items-center' onSubmit={ handleSubmit }>
            <label>
              First Name:
              <input
                className='border-2'
                type='text'
                name='First name'
                value={ firstName }
                onChange={ (event) => setFirstName(event.target.value) }
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                className='border-2'
                type='text'
                name='Last name'
                value={ lastName }
                onChange={ (event) => setLastName(event.target.value) }
              />
            </label>
            <br />
            <label>
              Email Address:
              <input
                className='border-2'
                type='text'
                name='Email Address'
                value={ emailAddress }
                onChange={ (event) => setEmailAddress(event.target.value) }
              />
            </label>
            <br />
            <div className='flex'>
            <button className="bg-green-400 mx-2 p-5" onClick={ handleSubmit } type='submit'>Save</button>
            <button className="bg-green-400 mx-2 p-5" onClick={ handleClose } type='submit'>Close</button>
            </div>
          </form>
        </div>                  
      </div>
    </div>
  );
};
