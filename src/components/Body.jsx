import React from 'react'
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Body = () => {
  return (
    <>
        <NavBar />
        {/* any children route of body will render over here*/}
        <Outlet /> 
        <Footer />
    </>
  )
}

export default Body;