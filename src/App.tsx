// react, styles, router
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// pages
import { Home } from './pages/Home'
import { Lobby } from './pages/Lobby'
import { Autosalon } from './pages/Autosalon'
import { Garage } from './pages/Garage'
import { Synchronization } from './pages/Synchronization'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/synchronization' element={<Synchronization />} />

        <Route path='/lobby' element={<Lobby />} />

        <Route path='/autosalon' element={<Autosalon />} />
        <Route path='/garage' element={<Garage />} />
      </Routes>
    </BrowserRouter>
  )
}
