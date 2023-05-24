import React from 'react'
import Navbar from "../components/Navbar";
import SideDrawer from "../components/SideDrawer";
import Backdrop from "../components/Backdrop";
import { fetchCart } from "../../redux/store/actions/cartActions";
import { getUserDetails } from "../../redux/store/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';

export default function StoreLayout() {

    const [sideToggle, setSideToggle] = useState(false);
    const user = useSelector((state) => state.user);
    const { loginSuccess, userDetails } = user;
  
    // fetchCart
    const dispatch = useDispatch();
    useEffect(() => {
      if (localStorage.getItem("token")) {
        dispatch(fetchCart());
        dispatch(getUserDetails());
      }
    }, [dispatch]);

  return (
    <div className='w-full h-full flex flex-col items-center overflow-hidden'>
        <>
        <Navbar click={() => setSideToggle(true)} />
        <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      </>
      <div className="w-full h-full">
        <Outlet />
    </div>
    </div>
  )
}
