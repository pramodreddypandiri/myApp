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
  return (
    <Layout title={'Analytics - My App'}>
        <div className='container min-h-screen mx-auto flex lg:flex-col flex-row '>
           <Chart/>
           <Tips/>
           {auth?.user?.role === 'ADMIN' && <UsersDetails/>}
           
        </div>
    </Layout>
   
  )
}

export default Dashboard