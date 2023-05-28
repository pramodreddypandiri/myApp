import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'
const PrivateRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()
    useEffect( () => {
        const authCheck = async () =>{
            console.log(auth?.token);
             const res = await axios.get('http://localhost:8088/api/v1/auth/user-auth',{
                headers : {
                    Authorization : `Bearer ${auth?.token}`
                }
             })
             console.log("response" + res);
             if(res && res?.data?.ok){
               console.log("OK true");
                setOk(true)
             }
             else{
               console.log("OK false");
                setOk(false)
             }
        };
        if(auth?.token) authCheck(); 
    }, [auth?.token])
  return ok ? <Outlet/> : <Spinner/>
}

export default PrivateRoute