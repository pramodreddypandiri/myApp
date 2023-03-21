import React from 'react'
import { NavLink } from 'react-router-dom'

const ManageMenu = () => {
  return (
    <>
       <div className='w-full m-10 p-5'>
        <div className='flex flex-col gap-5'> 
          <h4 className='font-semibold text-2xl'>Manage </h4>
          <div className='flex  flex-row lg:flex-col gap-5 '>
              <NavLink to='/manage/settings/create-category' className='w-full bg-black rounded-lg text-white p-2'>
                Create Category
              </NavLink>
              <NavLink to='/manage/settings/set-currency' className='w-full hidden bg-black rounded-lg text-white p-2'>
                Set Currency
              </NavLink>
              <NavLink to='/manage/settings/myprofile' className='w-full bg-black rounded-lg text-white p-2'>
                My Profile
              </NavLink>

          </div>
        </div>

       </div>
    </>
  )
}

export default ManageMenu