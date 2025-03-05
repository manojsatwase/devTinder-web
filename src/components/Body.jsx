import React, { use, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import Footer from './Footer';
import NavBar from './Navbar';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const userData = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(userData?.data?.user));
    } catch (err) {
      if(err.status === 401){
        navigate("/login");
      }
      console.log(err.message);
    }
  }

  useEffect(() => {
    // after the component load this fetchUser call
      fetchUser();
  }, []);

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