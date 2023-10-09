import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Login from './Login'
import RegisterSuccess from './RegisterSuccess'
import Omdb from './Omdb'

function Routing() {
  return (
    <div><BrowserRouter>
    <Routes>
    <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/registerSuccess' element={<RegisterSuccess/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/omdb' element={<Omdb/>}/>
    </Routes>
    </BrowserRouter></div>
  )
}

export default Routing