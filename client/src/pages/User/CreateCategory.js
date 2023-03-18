import React from 'react'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
import { useState, useEffect} from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm'
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useAuth();
    const [title, setTitle] = useState('')
    const userId = auth.user._id
    //handle category input submit
    const handleSubmit = async () => {
        try{
            const {data} = await axios.post('/api/v1/category/create-category',{title, userId}) 
            if(data?.success){
                toast.success(`${data.title} is created`)
                getAllCategories()
            }
            else{
                toast.error(data.message)
            }

        } catch (error){
            console.log(error);
            toast.error("Error in cat input ")

        }
    }
    const getAllCategories = async () => {
        
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
                <div>
                    <CategoryForm handleSubmit={handleSubmit} value={title} setValue={setTitle}/>
                </div>
                <div className=''>
                    <table className="min-w-[500px]">
                        <thead className="bg-black text-white">
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Actions</th>
                        </thead>
                        <tbody>
                           
                           {categories?.map((c) => (
                                <>
                                   <tr className=''>
                                        <td className="px-6 py-4 text-left whitespace-nowrap" key={c._id}>{c.title}</td>
                                        <td className='align-middle text-center'>
                                        <button className='bg-black px-4 py-1 rounded-lg text-white'>Edit</button>
                                        </td>
                                    </tr>
                                </>
                                ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory