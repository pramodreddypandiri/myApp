import React, { useState } from 'react'
import { NavItems } from '../../constants/NavItems'
import { NavLink } from 'react-router-dom'
import {close, menu} from '../../assets'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
const Header = () => {
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
    <nav className='navbar flex justify-between  items-center h-16 lg:h-20 mx-5'>
      {/* Large screen */}
      <div className='ml-4'>
        <p className='text-2xl font-bold hover:text-blue-600 cursor-pointer'>My App</p>
      </div>
      <ul className='navitems hidden sm:flex justify-end items-center flex-1 '>
      {
        !auth.user ? (
          <NavLink to={`/`}>
        <li className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"home"}>Home</li>
     </NavLink>
        ) : (
          <NavLink to={`/myhome`}>
        <li className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"home"}>My Home</li>
     </NavLink>
        )
      }
     {
      !auth.user ? (
      <>
        <NavLink to={`/login`}>
            <li className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"login"}>Login</li>
        </NavLink>
        <NavLink to={`/signup`}>
            <li className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"signup"}>Sign Up</li>
        </NavLink>
     </>
      ) : (
        <>
          <NavLink to={`/login`}>
             <li onClick={handleLogOut} className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"logout"}>Log out</li>
          </NavLink>
          <NavLink to={`/manage`}>
             <li  className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"manage"}>Manage</li>
          </NavLink>
          <NavLink to={`/analytics/${auth.user.role === "ADMIN" ? 'admin' : 'user'}`}>
             <li  className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"analytics"}>Analytics</li>
          </NavLink>
          
        </>
        
      )
     }
     
     

      </ul>
      {/* small screen */}
      <div className='sm:hidden flex flex-1 items-center justify-end
      '>
        <img src={toggle ? close : menu} className='w-[28px] h-[28px] object-contain' alt='menu' onClick={() => setToggle((prev) => !prev)}/>
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-gray-600 absolute top-10 right-0 ml-4 mr-2 my-2 min-w-[150px] rounded-lg sidebar`}>
          <ul className='flex flex-col'>
          <NavLink to={`/myhome`}>
        <li className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"home"}>Home</li>
     </NavLink>
     {
      !auth.user ? (
      <>
        <NavLink to={`/login`}>
            <li className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"login"}>Login</li>
        </NavLink>
        <NavLink to={`/signup`}>
            <li className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"signup"}>Sign Up</li>
        </NavLink>
     </>
      ) : (
        <>
          <NavLink to={`/login`}>
             <li onClick={handleLogOut} className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"logout"}>Log out</li>
          </NavLink>
          <NavLink to={`/manage`}>
             <li  className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"manage"}>Manage</li>
          </NavLink>
          <NavLink to={`/analytics`}>
             <li  className={`item font-normal hover:text-blue-600 cursor-pointer ml-5`} key={"analytics"}>Analytics</li>
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