import React from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom'
const Policy = () => {
  return (
    <Layout title={'Privacy Polciy - My App'}>
        <div className='register flex flex-col items-center justify-center lg:m-20 m-10'>
        <div className='register-title-div m-10'>
           <h1 className='register-title text-2xl md:text-4xl'>Privacy Polciy</h1>
           <div>
               <ul>
                <li className='my-3'>We take your privacy seriously. We will never share your personal information with any third parties.</li>
                <li className='my-3'>By using our website, you consent to our privacy policy. If you have any questions or concerns, please don't hesitate to <NavLink to='/contact'>
               <p className='text-blue-800'>Contact Us.</p>
            </NavLink></li>
               </ul>
            </div>
        </div>
        
    </div>
    </Layout>
  )
}

export default Policy