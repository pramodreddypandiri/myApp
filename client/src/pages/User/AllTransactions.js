import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const AllTransactions = () => {

    const [allTransactionsOfUser, setAllTransactionsOfUser] = useState()
    const [auth, setAuth] = useAuth();
    const userId = auth?.user?._id
    // get all transactions of user
    const getAllTransactionsOfUser = async () => {
        //console.log(userId);
        try{
            const{ data } = await axios.get('/api/v1/transaction/transactions', {params : {userId : userId}})
            if (data?.success){
                setAllTransactionsOfUser(data?.allTransactionsOfUser)
                //console.log(data?.allTransactionsOfUser);
            }
            else{
                toast.error("Something went wrong in fecthing transactions")
            }

        } catch (error){
            console.log(error);
            toast.error("Error in get All Transactions")
        }
    }
    // method to delete transaction 
    const handleDeleteTransaction = async(id) => {
        try{
            const {data} = await axios.post(`api/v1/transaction/delete-transaction/${id}`)
            if (data?.success){
                toast.success(data?.message)
                getAllTransactionsOfUser()
            }
            else{
                toast.error("Something went wrong")
            }
        } catch(error){
            console.log(error);
            toast.error("Something Went ")
        }
    }
    useEffect( () => {
       //getAllCategories();
       getAllTransactionsOfUser()
    },[])
  return (
    <Layout title={"All Transactios - MyApp"}>
            <div className='all-transactions-container container mx-auto items-center    w-full hidden lg:flex lg:flex-col'>
               <h1 className='text-2xl font-bold'>All Transactions</h1> 
               <div className='all-transactions-table w-full flex items-center justify-between'>
               <table class="min-w-[500px] mx-auto overflow-x-scroll divide-y divide-gray-200">
                    <thead className="bg-black text-white">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTransactionsOfUser?.map((t) => (
                            <>
                            <tr className='' key={t._id}>
                                 <td className={`px-6 py-4 text-left whitespace-nowrap ${t.type === "INCOME" ? 'text-green-700' : 'text-red-700'}`} >{t.amount}</td>
                                 <td className="px-6 py-4 text-left whitespace-nowrap" >{t?.categoryId?.title}</td>
                                 <td className="px-6 py-4 text-left whitespace-nowrap" >{t.description}</td>
                                 <td className="px-6 py-4 text-left whitespace-nowrap" >{t.date}</td>
                                 <td className='align-middle text-center'>
                                 <button className='bg-black px-4 py-1 rounded-lg text-white'>Edit</button>
                                 <button onClick={() => handleDeleteTransaction(t._id)} className='bg-red-700 ml-2 px-4 py-1 rounded-lg text-white'>Delete</button>
                                 </td>
                             </tr>
                         </>
                        ))}
                    </tbody>
                </table>

               </div>
            </div>
            <div className='all-trasactions-cards lg:hidden'>
                <div className='cards'>
                <div class="w-[95%] relative max-w-md mx-auto bg-white rounded-lg border-2 border-black  shadow-md overflow-hidden">
                        <div class=" flex absolute top-0 right-0 justify-between">
                            
                                <div className='date'>
                                   <p className='px-2 py-1 rounded-lg bg-black text-white'> 21/03/23</p>
                                </div>
                                    
                        </div>
                        <div class="px-6 py-4">
                           
                            <p class="text-gray-700 mb-2">200</p>
                            <p class="text-gray-700 mb-2">chicken</p>
                            <p class="text-gray-700 mb-2 uppercase">Grocery</p>
                            
                        </div>
                        
                    </div>
                </div>

            </div>
    </Layout>
  )
}

export default AllTransactions