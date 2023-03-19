import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { Select } from 'antd'
const {Option} = Select
const CreateTransaction = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()
    const [amount, setAmount] = useState()
    const [description, setDescription] = useState("")
    const [date, setDate] = useState()
    const [type, setType] = useState()
    const [auth, setAuth] = useAuth();
    const userId = auth.user._id
    // method to fetch all user categories
    const getAllCategories = async () => {
        
        console.log(typeof(userId));
         console.log(userId)
        try{
            const {data} = await axios.get('/api/v1/category/categories', {params: { userId }})
            if(data?.success){
                 setCategories(data?.allCatOfUser)
                 
            }
        } catch(error){
            console.log(error);
            toast.error("Something went wrong")
        }
        
    }
    useEffect( () => {
       // getAllCategories()
    },[])
  return (
     <Layout title={"Transactions - MyApp"}>
        <div className='container mx-auto flex flex-row gap-10'>
            <div className='create-transaction w-[300px]'>
                <h1 className='text-2xl font-bold'>Create Transaction</h1>
                <div className='transaction-input border-2  border-black rounded-lg'>
                    <form className='p-5'>
                        <input type={'nubmer'} className='p-2' placeholder=' Amount' value={amount } onChange={(e) => setAmount(e.target.value)}/>
                        <input type={'text'} className='p-2' placeholder='Description' value={description } onChange={(e) => setDescription(e.target.value)}/>
                        <input type={'date'} className='p-2'/>

                    </form>

                </div>

            </div>
            <div className='all-transactions-container'>
               <h1 className='text-2xl font-bold'>All Transactions</h1> 
            </div>

        </div>

     </Layout>
  )
}

export default CreateTransaction