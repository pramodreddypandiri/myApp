import React from 'react'
import { Watch } from 'react-loader-spinner'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Spinner = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => --prev)
        }, 1000)
        count === 0 && navigate('/login')
        return () => clearInterval(interval)
    }, [count,navigate])
  return (
    <div className='flex flex-col h-[80vh] justify-center items-center '>
    
        <div className='flex items-center justify-center '>
            <Watch  height="80"
            width="80"
            radius="48"
            color="#000"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}/>
        </div>
        <div className='text-center'>Redirecting in {count}</div>
    </div>
  )
}

export default Spinner