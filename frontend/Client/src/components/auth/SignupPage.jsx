/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    username:"",
    email: "",
    password: "",
    bio: "",
  })
  const [profilePicture,setProfilePicture]=useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
};
const handleFileChange = (e) => {
  setProfilePicture(e.target.files[0]);
};
    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("bio", formData.bio);
        form.append("profilePicture", profilePicture)
        try {
          const response = await fetch("http://localhost:8080/user/create-user", {
              method: "POST",
              body: form,
          });
          let success=false
          const result = await response.json();
          if (response.ok) {
              success=true
              alert("Signup successful!");
          } else {
              alert("Signup failed: " + result.error);
          }
          if(success){
            navigate('/profile')
          }
      } catch (error) {
          console.error("Error submitting form:", error);
          alert("Something went wrong.");
      }
  };
    return (
        <div className="flex items-center justify-center h-fit bg-gray-100 py-10 p-6 rounded-lg" >
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                
                <label htmlFor="username"  className="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Enter your Username" required className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"/>
                
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email" required className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"/>
                
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" onChange={handleChange} value={formData.password} placeholder="Enter your Password" required className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"/>
                
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input type="file" id="profilePicture" onChange={handleFileChange} required className="w-full p-2 border border-gray-300 rounded-lg mb-4"/>
                
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea id="bio" onChange={handleChange} value={formData.bio} className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"></textarea>
                
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">Sign Up</button>
            </form>
        </div>
    )
}


export default SignupPage;
