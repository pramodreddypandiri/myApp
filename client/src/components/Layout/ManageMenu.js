import React from 'react'
import { NavLink } from 'react-router-dom'

const ManageMenu = () => {
  return (
    <>
       <div className='m-10 p-5'>
        <div className='flex flex-col gap-5'> 
          {/* <h4 className='font-semibold text-2xl'>Manage </h4> */}
          <div className='flex lg:flex-col flex-row gap-5 '>
              <NavLink to='/manage/settings/create-category' className='text-center bg-black rounded-lg uppercase text-white py-2 px-4'>
                Category
              </NavLink>
              <NavLink to='/manage/settings/set-currency' className=' hidden text-center bg-black rounded-lg text-white uppercase py-2'>
                Set Currency
              </NavLink>
              <NavLink to='/manage/settings/myprofile' className='bg-black uppercase text-center rounded-lg text-white  py-2'>
                My Profile
              </NavLink>

          </div>
        </div>

       </div>
    </>
  )
}

export default ManageMenu