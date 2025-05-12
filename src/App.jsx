import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import ChatApp from './components/Chat'


function App() {
  

  return (
    <>
    {/* <Login/> */}
{/* <Navbar/> */}
<Routes>
<Route path='/' element={<Login/>} />
<Route path='/chatvat' element={<ChatApp/>} />
</Routes>
       
    </>
  )
}

export default App
