import axios from 'axios';
import React, {  useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import NavBar from './NavBar';
import Footer from './Footer';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store=>store?.user);

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