import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
const ForgotPassword = () => {
   const [email, setEmail] =  useState()
   const [question, setQuestion] = useState()
   const [newPassword, setNewPassword] = useState()
   const navigate = useNavigate()
   const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault()
     try {
        const res = await axios.post('/api/v1/auth/forgot-password',{
            email,
            question,
            newPassword
          })
          console.log(res);
          if(res && res?.data?.success){
            toast.success(res?.data?.message)
            navigate('/login')
          }
          else{
            toast.error("Password Reset Failed")
          }
        
     } catch (error) {
        toast.error(error?.response?.data?.message)
     }
     
   }
  return (
    <Layout title={"Forgot Password - My App "}>
    <div className='register flex flex-col items-center justify-center m-20'>
        <div className='register-title-div m-10'>
           <h1 className='register-title text-2xl md:text-4xl'>Reset Password</h1>
        </div>
        <form onSubmit={handleForgotPasswordSubmit} className='w-[300px] md:w-[350px] flex flex-col items-center gap-5'>
            <div className='user-email w-full'>
              <input type={'email'} placeholder="Enter your Email" value={email} onChange={(e) => {setEmail(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='user-question w-full'>
              <input type={'text'} placeholder="Enter Favuorite Actor" value={question} onChange={(e) => {setQuestion(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='user-new-password w-full'>
              <input type={'password'} placeholder="Enter New Password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='w-full'>
                <button type='submit' className=' w-full text-white bg-black rounded-lg p-2'>Reset Password</button>
            </div>
            
        </form>
       
    </div>
    
</Layout>
  )
}

export default ForgotPassword