import React from 'react'
import MemeCard from '../card/MemeCard'
import backgroundImage from "../assets/background.webp"
function LandingPage() {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    padding: '16px',
  };
  const cards = Array.from({ length: 10 });
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-cover bg-center">
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