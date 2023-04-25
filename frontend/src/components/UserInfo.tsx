import { useState } from 'react';

type UserInfoProps = {
  onClose: () => void;
  email: string;
};

const baseURL = "http://localhost:5000/"

const UserInfo = (props: UserInfoProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        try {
            const res = await fetch(`${baseURL}adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    emailAddress: props.email
                })
            });
            const data = await res.json();
            if (res.ok) {
                setFirstName(data.first_name);
                setLastName(data.last_name);
                props.onClose();
                location.reload()
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50">
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg">
                    <p className='flex justify-center text-3xl'>It looks like you're new to our site, welcome!</p>
                    <p className='flex justify-center text-xl mt-4'>Please enter your first and last name below to continue.</p>
                    <div className="mb-4 my-6">
                    <label className="block text-lg text-gray-700 font-bold mb-2" htmlFor="firstName">
                        First Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-lg text-gray-700 font-bold mb-2" htmlFor="lastName">
                        Last Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="px-8 py-4 bg-green-500 text-green-200
                            justify-center hover:text-white hover:bg-green-800
                            flex place-items-center rounded-full"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
