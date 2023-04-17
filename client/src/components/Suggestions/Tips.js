import React, { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast'
import axios from 'axios'
const Tips = () => {
  const [allTransactionsOfUser, setAllTransactionsOfUser] = useState()
  const [aiFeedack, setAiFeedback] = useState()
  const [auth, setAuth] = useAuth()
  const userId = auth?.user?._id
  //get all transactions data
  const getAllTransactionsOfUser = async () => {
    //console.log(userId);
    try{
        const{ data } = await axios.get('/api/v1/transaction/transactions', {params : {userId : userId}})
        if (data?.success){
            setAllTransactionsOfUser(data?.allTransactionsOfUser)
            const prompt = 'Here is an array of objects have information about expenses and income of a person, give me insights and what can be done to decrease expenses and save more. ' + allTransactionsOfUser;
            generateResponse(prompt);
        }
        else{
            toast.error("Something went wrong in fecthing transactions")
        }

    } catch (error){
        console.log(error);
        toast.error("Error in get All Transactions")
    }
}

//conf for openai
  const configuration = new Configuration({
    apiKey: "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",
});
  const openai = new OpenAIApi(configuration);
 
  const generateResponse = async (prompt) => {
    const response = await openai.createCompletion({
      engine: 'davinci',
      prompt, 
      max_tokens: 100,
      temperature: 0.5,
      n: 1
    })
    //console.log(response);
  }
  useEffect(() => {
      getAllTransactionsOfUser()
  },[])
  return (
    <div>I can give suggestions</div>
  )
}

export default Tips