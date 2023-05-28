import React from 'react'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
import { useState, useEffect} from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd';
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri'
import { IconContext } from "react-icons";
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
            const {data} = await axios.post('https://my-money-app.vercel.app/api/v1/category/create-category',{title, userId}) 
            if(data?.success){
                //console.log(data);
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
            const {data} = await axios.post(`https://my-money-app.vercel.app/api/v1/category/update-category/${selected._id}`,{title: updatedTitle, userId: userId})
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
            const {data} = await axios.post(`https://my-money-app.vercel.app/api/v1/category/delete-category/${id}`)
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
        
        //console.log(typeof(userId));
         //console.log(userId)
        try{
            const {data} = await axios.get('https://my-money-app.vercel.app/api/v1/category/categories', {params: { userId }})
            if(data.success){
                 setCategories(data.allCatOfUser)
                // console.log(categories);
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
        <div className='flex w-ull flex-col min-h-screen my-5 lg:flex-row '>
            <div className=''>
                 <ManageMenu category={true} profile={false}/>
            </div>
            <div className='lg:m-10  lg:w-[75%] p-5'>
                <h4 className='text-4xl font-semibold'>Create Category</h4>
                <div className='w-[95%]'>
                    <CategoryForm handleSubmit={handleSubmit} value={title} setValue={setTitle}/>
                </div>
                <div className='category-cards  overflow-y-scroll'>
                <h1 className='text-2xl text-center font-bold'>My Categories</h1> 
                <div className='cards-section flex flex-row flex-wrap'>
                    {categories?.map((c) =>(
                        <div key={c._id} className="w-full my-5 mx-2 border-l-2 border-b-2 border-black border-solid relative max-w-md  bg-white rounded-lg   shadow-lg overflow-hidden">
                        
                        <div className="flex flex-row px-6 mt-1 py-4">
                           <div className='details w-[90%]'>
                              <p className="text-gray-700 mb-2 font-semibold truncate uppercase">{c.title}</p>
                            </div>
                            <div className="actions flex  flex-row gap-5">
                                <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                <BiEdit  onClick={() => {setVisible(true); setUpdatedTitle(c.title); setSelected(c)}} className='cursor-pointer'/>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                <RiDeleteBinLine className='cursor-pointer'  onClick={() => {handleDelete(c._id)
                                        }} />
                                </IconContext.Provider>
                                
                           </div>
                        </div>
                        
                    </div>

                    ))}
                
                </div>

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