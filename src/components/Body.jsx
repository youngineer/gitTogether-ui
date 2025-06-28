import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const userData = useSelector((store) => store.user);

  // const fetchUser = async () => {
  //   if (userData) return;

  //   try {
  //     const res = await axios.get(BASE_URL + "/profile", {
  //       withCredentials: true,
  //     });
  //     dispatch(addUser(res.data));
  //     console.log(BASE_URL + "/profile")
  //   } catch (err) {
  //     if (err.response && err.response.status === 401) {
  //       navigate("/login");
  //     } else {
  //       console.error("Error fetching user profile:", err);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []); // fetch user only once when the page is rendered

  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body;
