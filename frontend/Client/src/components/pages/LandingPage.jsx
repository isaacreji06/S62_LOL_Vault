/* eslint-disable no-unused-vars */
import React from 'react'
import MemeCard from '../card/MemeCard'
import backgroundImage from "../../assets/background.webp"
import { useNavigate } from 'react-router-dom';
function LandingPage() {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    padding: '16px',
  };
  const cards = Array.from({ length: 10 });
  const Navigate=useNavigate()
  const handleSignUpButton=()=>{
    const user = localStorage.getItem("user")
    if (!user){
      Navigate('/signuppage')
    }
    else{
      Navigate('/profile')
    }
  }
  return (
    <div className="relative h-screen">
      <button className="absolute top-5 right-5 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition" onClick={handleSignUpButton}>
        Profile
      </button>
      <div className="flex flex-col items-center justify-start h-screen pt-10">
          <h1 className="text-4xl font-bold text-black-900">LOL Vault </h1>
          <h1 className="text-2xl font-bold text-black-600">Your 1 stop for memes!</h1>
          <div style={gridStyle}>
          {cards.map((_, index) => (
        <MemeCard key={index} />
      ))}
    </div>
      </div>
    </div>
  )
}

export default LandingPage