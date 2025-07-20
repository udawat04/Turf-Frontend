import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import AdminPage from './Pages/AdminPage'
import Signup from './Pages/Signup'
import FindGround from './Pages/FindGround'
import ContactUs from './Pages/ContactUsPage'
import AboutUs from './Pages/AboutUsPage'
import AddTurf from './Components/AddTurf'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}  />
    <Route path='/grounds' element={<FindGround/>}  />
    <Route path='/admin/addground' element={<AddTurf/>}  />
    <Route path='/contact' element={<ContactUs/>}  />
    <Route path='/about' element={<AboutUs/>}  />
    <Route path='/admin' element={<AdminPage/>}  />
     <Route path='/login' element={<Login/>}  />
     <Route path='/signup' element={<Signup/>}  />
   </Routes>
   </BrowserRouter>
  )
}

export default App