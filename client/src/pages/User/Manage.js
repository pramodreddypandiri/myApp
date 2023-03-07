import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
const Manage = () => {
    const [category, setCategory] = useState();
  return (
    <Layout title={"Manage - My App"}>
        <div className='category flex flex-col justify-center m-20'>
            <div className='addCategory-title-div '>
                <h1 className='addCategory-title text-2xl md:text-4xl'>Add Category
                </h1>
            </div>
        <form  className='w-[300px] md:w-[350px] my-10 flex flex-col items-center gap-5'>
            <div className='user-category w-full'>
              <input type={'text'} placeholder="" value={category} onChange={(e) => {setCategory(e.target.value)}} required className='border-2 border-black p-2 rounded-lg w-full'/>
            </div>
            <div className='w-full'>
                <button type='submit' className=' w-full text-white bg-black rounded-lg p-2'>Add</button>
            </div>
           
           
        </form>
        </div>
        
    </Layout>
  )
}

export default Manage