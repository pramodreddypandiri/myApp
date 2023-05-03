import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri'
import { IconContext } from "react-icons";
import { Select } from 'antd'
import { DatePicker, Space } from 'antd';
import {Modal} from 'antd';
import dayjs from 'dayjs';
const {Option} = Select
const AllTransactions = () => {
    // for date formatting, for using in edit transaction modal
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const currDate = new Date()
    const formattedDate = new Date().toLocaleDateString('en-US',options).toString()
    const dateFormat = 'DD/MM/YYYY'; 
    const [allTransactionsOfUser, setAllTransactionsOfUser] = useState()
    const [searchTerm, setSearchTerm] = useState()
    const [filteredTransactions, setFilteredTransactions] = useState()
    const [categories, setCategories] = useState()
    const [auth, setAuth] = useAuth();
     //Edit modal
     const [visible , setVisible] = useState(false)
     const [editedAmount,setEditedAmount] = useState()
     const [editedDescription,setEditedDescription] = useState()
     const [newDate, setNewDate] = useState()
     const [newType, setNewType] = useState()
     const [newCategory, setNewCategory] = useState()
     const [existingDate, setExistingDate] = useState()
     const [seletedTransaction, setSelectedTransaction] = useState()
    const userId = auth?.user?._id
    // filter transactions
    const filterTransactions = (searchInput) => {
        //const searchInput = searchTerm
        console.log(searchInput);
        const filtered_Transactions = allTransactionsOfUser.filter(transaction =>

            transaction?.amount.toString().includes(searchInput) || transaction?.categoryId?.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            transaction?.description.toLowerCase().includes(searchInput.toLowerCase())
          );
          console.log(filtered_Transactions);
          setFilteredTransactions(filtered_Transactions)
    }
    // get all transactions of user
    const getAllTransactionsOfUser = async () => {
        //console.log(userId);
        try{
            const{ data } = await axios.get('/api/v1/transaction/transactions', {params : {userId : userId}})
            if (data?.success){
                setAllTransactionsOfUser(data?.allTransactionsOfUser)
                setFilteredTransactions(data?.allTransactionsOfUser)
                //console.log(data?.allTransactionsOfUser);
                //filterTransactions()
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
            const {data} = await axios.post(`/api/v1/transaction/delete-transaction/${id}`)
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
    //Edit 
    const handleEditTransaction = async (e) => {
        e.preventDefault()
        try{
            const editedTransactionData = new FormData()
            editedTransactionData.append("amount", editedAmount)
            editedTransactionData.append("description", editedDescription)
            editedTransactionData.append("type", newType)
            editedTransactionData.append("date", newDate)
            editedTransactionData.append("categoryId", newCategory)
            const {data} = await axios.post(`/api/v1/transaction/update-transaction/${seletedTransaction}`, editedTransactionData)
            if(data?.success){
                toast.success("Updated Successfully")
                getAllTransactionsOfUser()
                setVisible(false)
            }
            else{
                toast.error("Something went wrong")
            }
        } catch(error){
            console.log(error);
        }

    }
    // method to fetch all user categories
    const getAllCategories = async () => {
        
        //console.log(typeof(userId));
         //console.log(userId)
        try{
            const {data} = await axios.get('/api/v1/category/categories', {params: { userId }})
            if(data?.success){
                //console.log(data?.allCatOfUser);
                setCategories(data?.allCatOfUser)
                 //console.log(categories);
                 
            }
        } catch(error){
            console.log(error);
            toast.error("Something went wrong")
        }
        
    }
    useEffect( () => {
       getAllCategories();
       getAllTransactionsOfUser()
       
    },[])
  return (
    <Layout title={"All Transactios - MyApp"}>
            <div className='all-trasactions-cards flex flex-col items-center '>
                <h1 className='text-2xl text-center font-bold'>All Transactions</h1> 
                <div className='search-div lg:mb-5 mb-3'><input className='search-transaction p-2 border-2 border-black rounded-lg lg:w-[400px] w-[300px]' placeholder='Search Amount, Description, Category' value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); filterTransactions(e.target.value)}}/></div>
                <div className='cards-section flex flex-row flex-wrap justify-center'>
                    {filteredTransactions?.map((tx) =>(
                        
                        <div className="w-[300px] my-5 mx-2 border-l-2 border-b-2 border-black border-solid relative max-w-md  bg-white rounded-lg   shadow-lg overflow-hidden">
                        <div className=" flex z-[100] w-full ">
                            <div className='date absolute  top-0 right-0'>
                                   <p className='px-2 py-1 rounded-tr-lg bg-black text-white'>{new Date(tx.date).toLocaleDateString("en-GB")}</p>
                                </div>
                        </div>
                        
                        <div className="flex flex-row px-6 mt-1 py-4">
                           <div className='details w-[90%]'>
                                <p className={`text-gray-700 font-bold truncate mb-2 ${tx.type === "INCOME" ? 'text-green-700' : 'text-red-700' }`}>{tx.amount}</p>
                                <p className="text-gray-700 truncate mb-2 ">{tx.description}</p>
                                <p className="text-gray-700 mb-2 font-semibold truncate uppercase">{tx?.categoryId?.title}</p>
                            </div>
                            <div className="actions flex mt-5 flex-col gap-5">
                            <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                <BiEdit onClick={()=> {setVisible(true); setSelectedTransaction(tx._id); setEditedAmount(tx.amount); setEditedDescription(tx.description); setNewDate(tx.date);setExistingDate(() => {const 
                                formattedExistingDate = new Date(tx.date).toLocaleDateString("en-GB"); return formattedExistingDate}); setNewType(tx.type); setNewCategory(tx?.categoryId)}} className='cursor-pointer'/>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                <RiDeleteBinLine className='cursor-pointer' onClick={() => handleDeleteTransaction(tx._id)}/>
                                </IconContext.Provider>
                                
                           </div>
                        </div>
                        
                    </div>

                    ))}
                
                </div>
                {/* Modal for edit transaction*/}
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
            <div className='create-transaction w-[300px] lg:mx-10 lg:w-[400px]'>
                <h1 className='text-2xl font-bold'>Edit Transaction</h1>
                <div className='transaction-input border-2  border-black mb-10 rounded-lg'>
                    <form onSubmit={handleEditTransaction} className='p-5 flex flex-col gap-6'>
                        <input type='number' min='1' className='p-2' placeholder=' Amount' value={editedAmount } onChange={(e) => setEditedAmount(e.target.value)}/>
                        <input type={'text'} className='p-2' placeholder='Description' value={editedDescription } onChange={(e) => setEditedDescription(e.target.value)}/>
                        <DatePicker value={dayjs(existingDate, dateFormat)}  onChange={(value) => {setNewDate(value)}
                            } format={dateFormat} />
                        <Select value={newType} placeholder="Select Transaction type" onChange={(value) => setNewType(value) } options={[{value : "INCOME", label : "Income"}, {
                            value: "EXPENSE",
                            label: "Expense"
                        }]} >
                            
                        </Select>
                        <Select  className='category-dropdown' placeholder='Select Category' onChange={(value) => setNewCategory(value) }  >
                            {categories?.map((c) => (
                               <Option  value={c._id} key={c._id} selected={c._id === newCategory}>{c.title}</Option>
                               
                                
                            ))}
                        </Select>
                        <button type='submit' className='bg-black px-4 py-2 rounded-lg text-white'>EDIT</button>
                    </form>

                </div>

            </div>
            </Modal>

            </div>
    </Layout>
  )
}

export default AllTransactions