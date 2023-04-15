import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri'
import { IconContext } from "react-icons";
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
            <div className='all-trasactions-cards  '>
                <h1 className='text-2xl text-center font-bold'>All Transactions</h1> 
                <div className='cards-section flex flex-row flex-wrap '>
                    {allTransactionsOfUser?.map((tx) =>(
                        
                        <div className="w-full my-5 mx-2 border-l-2 border-b-2 border-black border-solid relative max-w-md  bg-white rounded-lg   shadow-lg overflow-hidden">
                        <div className=" flex z-[100] w-full ">
                            <div className='date absolute  top-0 right-0'>
                                   <p className='px-2 py-1 rounded-tr-lg bg-black text-white'>{new Date(tx.date).toLocaleDateString("en-GB")}</p>
                                </div>
                        </div>
                        
                        <div className="flex flex-row px-6 mt-1 py-4">
                           <div className='details w-[90%]'>
                                <p className={`text-gray-700 font-bold truncate mb-2 ${tx.type === "INCOME" ? 'text-green-700' : 'text-red-700' }`}>{tx.amount}</p>
                                <p className="text-gray-700 truncate mb-2">{tx.description}</p>
                                <p className="text-gray-700 mb-2 font-semibold truncate uppercase">{tx?.categoryId?.title}</p>
                            </div>
                            <div className="actions flex mt-5 flex-col gap-5">
                                <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                <BiEdit/>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                <RiDeleteBinLine/>
                                </IconContext.Provider>
                                
                           </div>
                        </div>
                        
                    </div>

                    ))}
                
                </div>

            </div>
    </Layout>
  )
}

export default AllTransactions