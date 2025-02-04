/* eslint-disable no-unused-vars */
import React from 'react'
import LandingPage from './components/pages/LandingPage'
import { Routes,Route } from 'react-router-dom'
import SignupPage from './components/auth/SignupPage'
import ProfilePage from './components/pages/ProfilePage'

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-950 to-green-400">
    <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/signuppage' element={<SignupPage />} />
    <Route path='/profile' element={<ProfilePage />} />
    </Routes>
    </div>
  )
}

export default App