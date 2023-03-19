import React from 'react'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
import { useState, useEffect} from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd';
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useAuth();
    const [title, setTitle] = useState('')
    const [visible , setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedTitle, setUpdatedTitle] = useState("")
    const userId = auth.user._id
    //handle create category input submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post('/api/v1/category/create-category',{title, userId}) 
            if(data?.success){
                console.log(data);
                toast.success(`${data.cat.title} is created`)
                getAllCategories()
                setTitle("")
            }
            else{
                toast.error(data.message)
            }

        } catch (error){
            //console.log(error.response.data.message);
            toast.error(error?.response?.data?.message)

        }
    }
    // handle update category title
    const handleUpdate = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post(`/api/v1/category/update-category/${selected._id}`,{title: updatedTitle, userId: userId})
            if(data.success){
                toast.success(`${updatedTitle} is updated`)
                setUpdatedTitle("")
                setSelected(null)
                setVisible(false)
                getAllCategories()
            }
            else{
                toast.error("Something went wrong")
            }
        } catch (error){
            console.log(error);
            toast.error("Something went wrong in Update Title")
        }
    }
    // handle delete category title
    const handleDelete = async (id) => {
        
        try{
            const {data} = await axios.post(`/api/v1/category/delete-category/${id}`)
            if(data.success){
                toast.success( 'Deleted Successfully')
                
                getAllCategories()
            }
            else{
                toast.error("Something went wrong")
            }
        } catch (error){
            console.log(error);
            toast.error("Something went wrong in Update Title")
        }
    }
    // method to fetch all user categories
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
                    <table className="min-w-[500px] divide-y divide-gray-200">
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
                                        <button onClick={() => {setVisible(true); setUpdatedTitle(c.title); setSelected(c)}} className='bg-black px-4 py-1 rounded-lg text-white'>Edit</button>
                                        <button onClick={() => {handleDelete(c._id)
                                        }} className='bg-red-700 ml-2 px-4 py-1 rounded-lg text-white'>Delete</button>
                                        </td>
                                    </tr>
                                </>
                                ))}
                            
                        </tbody>
                    </table>
                </div>
                <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                    <CategoryForm value={updatedTitle} handleSubmit={handleUpdate} setValue={setUpdatedTitle}/>
                </Modal>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory