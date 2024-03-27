// react, styles, router
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// pages
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Autosalon } from './pages/Autosalon'
import { Garage } from './pages/Garage'
import { Auth } from './pages/Auth'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        <Route path='/profile' element={<Profile />} />
        <Route path='/autosalon' element={<Autosalon />} />
        <Route path='/garage' element={<Garage />} />

        <Route path='/auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}
