import React, { useState, useEffect } from 'react'

import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast'
import axios from 'axios'
const Tips = () => {
  const [aiFeedack, setAiFeedback] = useState()
  const [auth, setAuth] = useAuth()
  const userId = auth?.user?._id
  
  const getAiFeedBack = async () => {
    console.log('getAiFeedback');
    try {
        const {data} = await axios.get('/api/v1/transaction/get-suggestion',{params : {userId : userId}})
        if(data?.success){
          toast.success("success")
        }
    } catch (error) {
      toast.error("error in ai feedback")
      console.log(error);
    }
  }
  useEffect(() => {
      getAiFeedBack()
  },[])
  return (
    <div>I can give suggestions</div>
  )
}

export default Tips