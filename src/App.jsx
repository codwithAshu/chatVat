import React ,{ Suspense, lazy  } from 'react'

import { Route, Routes } from 'react-router-dom'
const Login=lazy(()=>import('./components/Login'))
const Signup = lazy(() => import('./components/Signup'))
const Qrcode = lazy(() => import('./components/Qrcode'))
const ChatApp = lazy(() => import('./components/Chat'))

function App() {

  
  return (
    <>
    <Suspense fallback={<div>loading.....</div>}>
<Routes>
  <Route path='/'  element={<Signup/>}/>
  <Route path='/codescan'  element={<Qrcode/>}/>
<Route path='/login' element={<Login/>} />
<Route path='/chatvat' element={<ChatApp/>} />
</Routes>
</Suspense>
    </>
  )
}

export default App
