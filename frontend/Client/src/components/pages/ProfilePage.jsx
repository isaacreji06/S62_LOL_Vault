
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      // navigate('/signuppage');
    } else {
      setUser(storedUser);
      }
  }, [navigate]);

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;  // Show loading state while fetching data
console.log(user)
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
        {user.profilePicture && (
          <img
            src={`http://localhost:8080/uploads/${user.profilePicture}`}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h2 className="text-xl font-semibold">@{user.username}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2">{user.bio}</p>
        <button
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/signuppage');
          }}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-600 transition"
        >
          Logout
        </button>
        <button
          onClick={() => {
            navigate('/');
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
