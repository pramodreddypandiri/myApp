import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { useNavigate, useLocation, NavLink} from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    //handle login (submit)
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/login',{email, password})
            console.log(res);
            if(res && res?.data?.success){
                setAuth({
                    ...auth,
                    user : res?.data?.user,
                    token: res?.data?.token
                })
                console.log(auth);
                localStorage.setItem("auth", JSON.stringify(res?.data))
                toast.success("Logged in  successfully")
                navigate(location.state || "/myhome")
            }
            else{
                toast.error(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
            
        }


    }
  return (
    <Layout title={"Log in - My App "}>
    <div className='login flex flex-col items-center justify-center m-20'>
        <div className='login-title-div m-10'>
           <h1 className='login-title text-2xl md:text-4xl'>Login</h1>
        </div>
        <form onSubmit={handleLoginSubmit} className='w-[300px] md:w-[350px] flex flex-col items-center gap-5'>
            <div className='user-email w-full'>
              <input type={'email'} placeholder="Enter your Email" value={email} onChange={(e) => {setEmail(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='user-password w-full'>
              <input type={'password'} placeholder="Enter password" value={password} onChange={(e) => {setPassword(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='w-full'>
                <button type='submit' className='uppercase w-full text-white bg-black rounded-lg p-2'>Login</button>
            </div>
            <NavLink to='/forgot-password'>
               <p className='text-blue-800'>Forgot Password?</p>
            </NavLink>
        </form>
       
    </div>
    
</Layout>
  )
}

export default Login