import React from 'react';
import {Link} from "react-router-dom";

const ProfilePage = () => {
  // Fetching user data from localStorage (with a default value for the demo)
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    profilePicture: null,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-4 p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        {user ? (
          <div className="flex flex-col items-center">
            <img
              alt="User Profile"
              src={user.profilePicture || 'https://i.postimg.cc/s1zW5CcB/download-7.jpg'}
              className="h-32 w-32 rounded-full mb-6 border-4 border-gray-600 object-cover hover:opacity-80 transition-opacity"
            />
            <div className="w-full text-center space-y-3">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
          </div>
        ) : (
          <p>No user details available.</p>
        )}
      </div>

      <div className="flex mt-4">
        <Link to="/" ><span className="mt-3 px-4 py-2 bg-white text-black rounded-2xl font-bold hover:text-blue-600">Go Back</span></Link>
      </div>

    </div>
  );
};

export default ProfilePage;
