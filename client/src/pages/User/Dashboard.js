import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Chart from '../../components/Charts/Chart.js'
import Tips from '../../components/Suggestions/Tips'
import UsersDetails from '../Admin/UsersDetails'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const [auth, setAuth] = useAuth()
  const userId = auth?.user?._id
  const [totalData, setTotalData] = useState()
  const [filteredData, setFilteredData] = useState()
  const getAllTransactionsOfUser = async () => {
    try{
        const{ data } = await axios.get('/api/v1/transaction/transactions', {params : {userId : userId}})
        if (data?.success){
            
        }
        else{
            toast.error("Something went wrong in fecthing transactions")
        }

    } catch (error){
        console.log(error);
        toast.error("Error in get All Transactions")
    }
}
  return (
    <Layout>
        <div className='container mx-auto flex lg:flex-col flex-row '>
           <Chart/>
           <Tips/>
           {auth?.user?.role === 'ADMIN' && <UsersDetails/>}
           
        </div>
    </Layout>
   
  )
}

export default Dashboard