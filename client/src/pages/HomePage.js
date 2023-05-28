import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { NavLink } from 'react-router-dom'
const HomePage = () => {
  const [auth,setAuth] = useAuth();

  return (
    <Layout title={'Welcome'}>
<div className='register flex flex-col min-h-screen items-center justify-center lg:m-20 m-10'>
        <div className='home-title-div m-10'>
           <h1 className='home-title text-2xl md:text-4xl'>Hey! Welcome.</h1>
           <div>
            <p>This is an app for recording your day to day <span className='text-red-700'>expenses</span> and <span className='text-green-700'>income.</span> 
               </p>
               <p>Get insights about your cash flow in Analytics page. </p>
               <p>Start by <NavLink  to='/manage/settings/create-category'><span className='text-blue-800'>creating categories</span></NavLink>  according to your spending habits.</p>
           </div>
        </div>
        
    </div>
        
    </Layout>
  )
}

export default HomePage