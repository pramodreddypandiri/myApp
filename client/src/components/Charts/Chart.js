import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { PieChart, Pie, Tooltip } from 'recharts';

const Chart = () => {
  const [auth, setAuth] = useAuth()
  const userid = auth?.user?._id
  const [dataPointsExpense, setDataPointsExpense] = useState([])
  const [dataPointsIncome, setDataPointsIncome] = useState([])
  
// data for total sum expenses
const getExpenseData = async () => {
  
  try{
     const {data} = await axios.get('/api/v1/transaction/category-totalsum', {params : {userId : userid, type: 'EXPENSE'}})
     if(data?.success){
       //console.log(data);
       setDataPointsExpense(data?.datapoints)
        //console.log("total points" + dataPointsExpense);

     }
  } catch(error){
     console.log(error);

  }
}
// data for total sum income
const getIncomeData = async() => {
  try {
    const {data} = await axios.get('/api/v1/transaction/category-totalsum', {params : {userId : userid, type: 'INCOME'}})
    if(data?.success){
      //console.log(data);
      setDataPointsIncome(data?.datapoints)
       //console.log("total points" + dataPointsExpense);

    }
  } catch (error) {
    
  }
}
useEffect(() => {
  getExpenseData()
  getIncomeData()
},[])
  return (
    <div className='flex flex-col lg:flex-row'>
      {dataPointsExpense.length > 0 ? (<div>
        <PieChart width={400} height={400}>
      <Pie
        data={dataPointsExpense}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#B91C1C"
        paddingAngle={5}
        dataKey="value"
        label
      >
        
      </Pie>
      <Tooltip />
    </PieChart>
    </div>) : (<div className='text-xl p-4 m-4'>No Expenditure data to show</div>)}
    {/* Income */}
    {dataPointsIncome.length > 0 ? (
    <PieChart width={400} height={400}>
      <Pie
        data={dataPointsIncome}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#15803D"
        paddingAngle={5}
        dataKey="value"
        label
      >
        
      </Pie>
      <Tooltip />
    </PieChart>) : (<div  className='text-xl p-4 m-4'>No Income data to show</div>)}
    <div className='suggestions'>

    </div>
   </div>
  )
}

export default Chart