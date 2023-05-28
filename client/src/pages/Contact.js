import React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const Contact = () => {
  const [email, setContactEmail] = useState()
  const [name, setContactName] = useState()
  const [message, setMessage] = useState()
  const handleContactSubmit = async (e) => {
       e.preventDefault()
       
      try{
        const {data} = await axios.post('/api/v1/contact/store-contact',{email,name,message})
        if(data?.success){
          toast.success("Success")
          setContactEmail("")
          setContactName("")
          setMessage("")
        }
      } catch(error){
        alert(error)
        console.log(error);
        toast.error("Some thing went wrong")
      }
  }
  return (
    <Layout title={'Contact Us - My App'}>
        <div className='register flex min-h-screen flex-col items-center justify-center m-20'>
        <div className='register-title-div m-10'>
           <h1 className='register-title text-2xl md:text-4xl'>Contact Form</h1>
        </div>
        <form onSubmit={handleContactSubmit} className='w-[300px] md:w-[350px] flex flex-col items-center gap-5'>
            <div className='contact-email w-full'>
              <input type={'email'} placeholder="Enter your Email" value={email} onChange={(e) => {setContactEmail(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='contact-name w-full'>
              <input type={'text'} placeholder="Enter Name" value={name} onChange={(e) => {setContactName(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='contact-message w-full'>
              <textarea rows="5" type={'text'} placeholder="Enter Message/Feedback" value={message} onChange={(e) => {setMessage(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            
            <div className='w-full'>
                <button type='submit' className='uppercase w-full text-white bg-black rounded-lg p-2'>Submit</button>
            </div>
            
        </form>
       
    </div>
    </Layout>
  )
}

export default Contact