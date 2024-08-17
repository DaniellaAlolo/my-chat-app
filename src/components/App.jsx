
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SideNav from './SideNav';
import Chat from './Chat'
import ProtectedRoutes from '../utils/ProtectedRoutes';


function App() {

  return (
    <>
      <SideNav/>
      <div className='MainContainer'>
      <Routes> {/* Define routes */}
          <Route path="/" element={<Home/>} /> 
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/register" element={<Register/>} /> 
          <Route element={<ProtectedRoutes />}> {/* Protected routes */}
            <Route path="/chat" element={<Chat />} /> {/* Chat route */}
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
