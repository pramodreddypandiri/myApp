import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Select } from 'antd'
import { PieChart, Pie, Cell } from 'recharts';
const {Option} = Select
const Chart = () => {
  const [auth, setAuth] = useAuth()
  const userId = auth?.user?._id
  console.log("user id " + userId);
  const [totalData, setTotalData] = useState()
  const [filteredData, setFilteredData] = useState()
  const [dataPoints, setDataPoints] = useState()
  const [month, setMonth] = useState()
  //months
  const months = [
    { id: 1, title: 'January' },
    { id: 2, title: 'February' },
    { id: 3, title: 'March' },
    { id: 4, title: 'April' },
    { id: 5, title: 'May' },
    { id: 6, title: 'June' },
    { id: 7, title: 'July' },
    { id: 8, title: 'August' },
    { id: 9, title: 'September' },
    { id: 10, title: 'October' },
    { id: 11, title: 'November' },
    { id: 12, title: 'December' }
  ];
  const data = [
    { name: 'Red', value: 300 },
    { name: 'Blue', value: 50 },
    { name: 'Yellow', value: 100 }
  ];
  
// filter data 
const getExpenseDataForMonth = async () => {
  
     try{
        const {data} = await axios.get('/api/v1/transaction/category-sum', {params : {userId : userId}})
        if(data?.success){
           setDataPoints(data?.dataPoints)

        }
     } catch(error){
        console.log(error);

     }
}

useEffect(() => {
 
},[month])
  return (
    <>
       <Select className='month-dropdown' bordered={false}  placeholder='Select Month' onChange={(value) =>setMonth(value)
      } >
                            {months?.map((m) => (
                                <Option value={m.id} key={m.id}>{m.title}</Option>
                            ))}
        </Select>   

        <PieChart width={400} height={400}>
      <Pie
        data={dataPoints}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        
      </Pie>
    </PieChart>

   </>
  )
}

export default Chart