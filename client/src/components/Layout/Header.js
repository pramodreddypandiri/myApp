import React, { useState } from 'react'
import { NavItems } from '../../constants/NavItems'
import { NavLink } from 'react-router-dom'
import {close, menu} from '../../assets'
const Header = () => {
  const [toggle,setToggle] = useState(false)
  return (
    <nav className='navbar flex justify-between  items-center h-16 lg:h-20'>
      {/* Large screen */}
      <div className='ml-5'>
        <p className='text-2xl font-bold hover:text-blue-600 cursor-pointer'>My App</p>
      </div>
      <ul className='navitems hidden sm:flex justify-end items-center flex-1 mr-5'>
      {NavItems.map((item, index) => (
          <NavLink to={`${item?.Route}`}>
             <li className={`item font-normal hover:text-blue-600 cursor-pointer  ${index === NavItems.length-1 ? 'mr-0' : 'mr-10'}`  } key={item?.id}>{item?.Title}</li>
          </NavLink>

        ))}

      </ul>
      {/* small screen */}
      <div className='sm:hidden flex flex-1 items-center justify-end
      '>
        <img src={toggle ? close : menu} className='w-[28px] h-[28px] object-contain' alt='menu' onClick={() => setToggle((prev) => !prev)}/>
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-gray-600 absolute top-10 right-0 ml-4 mr-2 my-2 min-w-[150px] rounded-lg sidebar`}>
          <ul className='flex flex-col'>
          {NavItems.map((item, index) => (
          <NavLink to={`${item?.Route}`}>
             <li className={`item font-normal hover:text-blue-600 cursor-pointer text-white ${index === NavItems.length-1 ? 'mb-0' : 'mb-4'}`  } key={item?.id}>{item?.Title}</li>
          </NavLink>

        ))}
          </ul>
        </div>
      </div>
      

    </nav>
  )
}

export default Header