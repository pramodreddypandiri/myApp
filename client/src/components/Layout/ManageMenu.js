import React from 'react'
import { NavLink } from 'react-router-dom'

const ManageMenu = (props) => {
  return (
    <>
       <div className='m-10 p-5'>
        <div className='flex flex-col gap-5'> 
          {/* <h4 className='font-semibold text-2xl'>Manage </h4> */}
          <div className='flex w-[150px] items-center lg:flex-col justify-between flex-row gap-5 '>
              <NavLink to='/manage/settings/create-category' className={`w-full text-center ${props.category ? 'bg-black text-white' : ''} border-2 rounded-lg uppercase  py-2 px-4`}>
                Category
              </NavLink>
              {/* <NavLink to='/manage/settings/set-currency' className=' hidden text-center bg-black rounded-lg text-white uppercase py-2'>
                Set Currency
              </NavLink> */}
              <NavLink to='/manage/settings/myprofile' className={`text-center ${props.profile ? 'bg-black text-white' : ''}  w-full border-2 rounded-lg uppercase  py-2 px-4`}>
               Profile
              </NavLink>

          </div>
        </div>

       </div>
    </>
  )
}

export default ManageMenu