import React ,{ Suspense, lazy  } from 'react'

import { Route, Routes } from 'react-router-dom'
import Login  from './components/Login.jsx';
import Signup from './components/Signup'
const Qrcode = lazy(() => import('./components/Qrcode'))
const ChatApp = lazy(() => import('./components/Chat'))

function App() {


  return (
    <>
    <Suspense fallback={<div>rukjaa bhai tera hi net slow he.....</div>}>
<Routes>
  <Route path='/'  element={<Signup/>}/>
  <Route path='/codescan'  element={<Qrcode/>}/>
<Route path='/login' element={<Login/>} />
<Route path='/chatvat' element={<ChatApp/>} />
<Route path='/qrcode' element={<Qrcode/>}/>
</Routes>
</Suspense>
    </>
  )
}

export default App
