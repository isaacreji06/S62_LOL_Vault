import React, { useEffect, useState } from 'react';
import image from "../assets/meme.jpg";

function MemeCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/user/get-user')
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setData(data.message); // Set the first user's data
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div className='bg-white h-44 w-44'>
        <img src={image} alt="" className='h-32 w-44' />
        {/* Conditional Rendering: Only render the username and createdAt if data is not null */}
        {data ? (
          <>
            <h6 className="text-center">username: {data.username}</h6>
            <h6 className="text-center">uploaded at: {data.createdAt}</h6>
          </>
        ) : (
          <p>Loading...</p>  // Show loading message while data is being fetched
        )}
      </div>
    </div>
  );
}

export default MemeCard;
