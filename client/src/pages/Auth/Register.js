import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast  from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [question, setQuestion] = useState("")
    const navigate = useNavigate()
    //toggle show password
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    // form submit function
    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/api/v1/auth/register`, {name, email,password , question})
            //console.log(res);
            if(res && res?.data?.success){
                toast.success("Registered Successfully")
                navigate('/login')
            }
            else{
                toast.error(res?.data?.message)
            }
            
        } catch (error) {
            //console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
        }
    } 
  return (
    
    <Layout title={"Register - My App "}>
        <div className='register flex flex-col items-center justify-center m-20'>
            <div className='register-title-div m-10'>
               <h1 className='register-title text-2xl md:text-4xl'>Register Here</h1>
            </div>
            <form onSubmit={handleRegisterSubmit} className='w-[300px] md:w-[350px] flex flex-col gap-5'>
                <div className='user-name w-full'>
                  <input type={'text'} placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}}required className='border-2 border-black p-2 rounded-lg w-full'/>
                </div>
                <div className='user-email w-full'>
                  <input type={'email'} placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
                </div>
                <div className='user-password w-full'>
                  <input  type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
                </div>
                <div className='user-forgotpassword-question w-full'>
                  <input type={'text'} placeholder="Favorite Actor" value={question} onChange={(e) => {setQuestion(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
                </div>
                <div className='flex mt-2 items-center'>
              <input className='border-2 border-black p-2 rounded-lg ' type="checkbox" id="showPassword" checked={showPassword}
        onChange={togglePasswordVisibility}/>
  <label className='ml-2' for="showPassword">Show password</label>
            </div>
                <div>
                    <button type='submit' className=' w-full uppercase text-white bg-black rounded-lg p-2'>Register</button>
                </div>
            </form>
           
        </div>
        
    </Layout>
  )
}

export default Register