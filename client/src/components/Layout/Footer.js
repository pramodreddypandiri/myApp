import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-black font-medium p-2  flex flex-col w-full'>
      <h4 className='text-center text-white py-3'>All Rights Reserved &copy; PramodReddy</h4>
      <div className='flex text-center mx-auto  gap-3 flex-col sm:flex-row text-white font-medium' >
        <Link to='/contact' className='hover:text-blue-600'>Contact</Link>
        <div className='hidden sm:block'>|</div>
        <Link  to='/policy' className='hover:text-blue-600'>Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Footer