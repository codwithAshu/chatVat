import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import ChatApp from './components/Chat'
import Signup from './components/Signup'
import Qrcode from './components/Qrcode'


function App() {
  

  return (
    <>
    {/* <Login/> */}
{/* <Navbar/> */}
<Routes>
  <Route path='/'  element={<Signup/>}/>
  <Route path='/codescan'  element={<Qrcode/>}/>
<Route path='/login' element={<Login/>} />
<Route path='/chatvat' element={<ChatApp/>} />
</Routes>
       
    </>
  )
}

export default App
