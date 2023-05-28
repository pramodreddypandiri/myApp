import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast'
import axios from 'axios'
const { Configuration, OpenAIApi } = require("openai");
const Tips = () => {
  const [aiFeedack, setAiFeedback] = useState()
  const [allTransactionsDataOfUser, setAllTransactionsDataOfUser] = useState()
  const [auth, setAuth] = useAuth()
  const userId = auth?.user?._id
  // get all transactions of user
  const getAllTransactionsDataOfUser = async () => {
    try{
        const{ data } = await axios.get('/api/v1/transaction/transactions', {params : {userId : userId}})
        if (data?.success){
            setAllTransactionsDataOfUser(data?.allTransactionsOfUser)
            toast.success("Successfull Fecthed Data")
            getAiFeedBack()
        }
        else{
            toast.error("Something went wrong in fecthing transactions")
        }

    } catch (error){
        console.log(error);
        toast.error("Error in get All Transactions")
    }
}
  const getAiFeedBack = async () => {
    const stringData = JSON.stringify(allTransactionsDataOfUser)
    const prompt =  ` Here is my transactions data : ${JSON.stringify(allTransactionsDataOfUser)} . Give me suggestions to lower my expenses and become financially stable`
    try{
        const {data} = axios.post('/api/v1/transaction/get-ai-feedback', {prompt})
        if(data?.success){
          setAiFeedback(data?.airesponse)
          toast.success("Success")
        }
    } catch(error){
        console.log(error);
        toast.error("some thing went wrong")
    }
  }
  useEffect(() => {
    getAllTransactionsDataOfUser()
      
  },[])
  return (
    <div>Here are my suggestions for you : {aiFeedack}</div>
  )
}

export default Tips