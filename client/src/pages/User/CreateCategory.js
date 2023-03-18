import React from 'react'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
import { useState, useEffect} from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useAuth();
    const getAllCategories = async () => {
        const userId = auth.user._id
        console.log(typeof(userId));
         console.log(userId)
        try{
            const {data} = await axios.get('/api/v1/category/categories', {params: { userId }})
            if(data.success){
                 setCategories(data.allCatOfUser)
                 
            }
        } catch(error){
            console.log(error);
            toast.error("Something went wrong")
        }
        
    }
    useEffect( () => {
        getAllCategories()
    },[])
  return (
    <Layout title={'Manage - Create Category'}>
        <div className='flex flex-row'>
            <div>
                <div>
                    <ManageMenu/>
                </div>
            </div>
            <div className='ml-10 mt-10'>
                <h4 className='text-2xl font-semibold'> Category</h4>
                <div className='w-[500px]'>
                    <tabel className="w-[500px] divide-y divide-gray-200">
                        <thead className="bg-black text-white">
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </thead>
                        <tbody>
                           
                           {categories.map((c) => (
                                <>
                                   <tr>
                                        <td className="px-6 py-4 whitespace-nowrap" key={c._id}>{c.title}</td>
                                        <button className='bg-black px-4 py-2 rounded-lg text-white'>Edit</button>
                                    </tr>
                                </>
                                ))}
                            
                        </tbody>
                    </tabel>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory