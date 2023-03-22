import { HashRouter, Routes, Route } from 'react-router-dom'
// import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Food from './pages/Food'
import './App.css'
import Journal from './pages/Journal'

function App() {

  return (
    <HashRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
    </HashRouter>
  )
}

export default App;
