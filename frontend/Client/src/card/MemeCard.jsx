import React from 'react'
import image from "../assets/meme.jpg"
function MemeCard() {
  return (
    <div>
      <div className='bg-white h-44 w-44'>
        <img src={image} alt="" className='h-32 w-44' />
        <h6 className="text-center">username:johndoe007</h6>
        <h6 className="text-center">uploaded at:11-09-2001</h6>
      </div>
    </div>
  )
}

export default MemeCard