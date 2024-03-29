import React, { useEffect, useState } from 'react'

import { NavItems } from '../../constants/NavItems'
import { NavLink } from 'react-router-dom'
import {close, menu} from '../../assets'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
const Header = (props) => {
  const [toggle,setToggle] = useState(false)
  const [auth, setAuth] = useAuth()
  // log out 
  const handleLogOut =() => {
    setAuth({
      ...auth,
      user: null,
      token :""
    })
    localStorage.removeItem("auth")
    toast.success("Log out Successfull")
  }
  return (
    <nav className='navbar flex justify-between shadow-xl   items-center h-16 lg:h-20 p-5 '>
      {/* Large screen */}
      <div className=''>
        <p className='text-2xl font-bold hover:text-blue-600 cursor-pointer mb-0'>My App</p>
      </div>
      <ul className='navitems hidden sm:flex justify-end items-center flex-1 mb-0 '>
      {
        !auth.user ? (
          <NavLink to={`/`}>
        <li className={` ${props.activeHome ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"home"}>Home</li>
     </NavLink>
        ) : (
          <NavLink to={`/myhome`}>
        <li className={`${props.activeMyHome ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"home"}>My Home</li>
     </NavLink>
        )
      }
     {
      !auth.user ? (
      <>
        <NavLink to={`/login`}>
            <li className={`${props.activeLogin ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"login"}>Login</li>
        </NavLink>
        <NavLink to={`/signup`}>
            <li className={`${props.activeSignup ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"signup"}>Sign Up</li>
        </NavLink>
     </>
      ) : (
        <>
          <NavLink to={`/login`}>
             <li onClick={handleLogOut} className={`item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"logout"}>Log out</li>
          </NavLink>
          <NavLink to={`/manage/settings/create-category`}>
             <li  className={`${props.activeManage ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"manage"}>Manage</li>
          </NavLink>
          <NavLink to={`/analytics/dashboard`}>
             <li  className={`${props.activeAnalytics ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"analytics"}>Analytics</li>
          </NavLink>
          
        </>
        
      )
     }
     
     

      </ul>
      {/* small screen */}
      <div className='sm:hidden flex flex-1 items-center justify-end
      '>
        <img src={toggle ? close : menu} className='w-[28px] h-[28px] object-contain' alt='menu' onClick={() => setToggle((prev) => !prev)}/>
        <div className={`${toggle ? 'flex flex-row items-center' : 'hidden'} px-2  py-4 z-[1000] bg-black text-white absolute top-10 right-0 ml-4 mr-2 my-2 min-w-[150px] rounded-lg sidebar`}>
          <ul className='flex flex-col  items-end mb-0 gap-3'>
          <NavLink to={`/myhome`}>
        <li className={`${props.activeMyHome ?  'text-blue-600' : ''} item font-normal  hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"home"}>My Home</li>
     </NavLink>
     {
      !auth.user ? (
      <>
        <NavLink to={`/login`}>
            <li className={`${props.activeLogin ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"login"}>Login</li>
        </NavLink>
        <NavLink to={`/signup`}>
            <li className={`${props.activeSignup ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"signup"}>Sign Up</li>
        </NavLink>
     </>
      ) : (
        <>
          <NavLink to={`/login`}>
             <li onClick={handleLogOut} className={`item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"logout"}>Log out</li>
          </NavLink>
          <NavLink to={`/manage/settings/create-category`}>
             <li  className={`${props.activeManage ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"manage"}>Manage</li>
          </NavLink>
          <NavLink to={`/analytics/dashboard`}>
             <li  className={`${props.activeAnalytics ?  'text-blue-600' : ''} item font-normal hover:text-blue-600 cursor-pointer uppercase ml-5`} key={"analytics"}>Analytics</li>
          </NavLink>
        </>
        
      )
     }
          
          

       
          </ul>
        </div>
      </div>
      

    </nav>
  )
}

export default Header