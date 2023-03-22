import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { Select } from 'antd'
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri'
import { IconContext } from "react-icons";
const {Option} = Select
const CreateTransaction = () => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const currDate = new Date()
    const formattedDate = new Date().toLocaleDateString('en-US',options).toString()
    const [categories, setCategories] = useState()
    const [category, setCategory] = useState()
    const [amount, setAmount] = useState()
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(currDate)
    const [type, setType] = useState("EXPENSE")
    const [auth, setAuth] = useAuth();
    const [allTransactionsOfUser, setAllTransactionsOfUser] = useState()
    const userId = auth?.user?._id
    const dateFormat = 'MM/DD/YYYY';
    //console.log(userId);
    //console.log(currDate.toString());
    //create transaction method
    const handleCreateTransaction = async (e) => {
          e.preventDefault()
          try{
                const transactionData = new FormData()
                transactionData.append("amount", amount)
                transactionData.append("description", description)
                transactionData.append("type", type)
                transactionData.append("date", date)
                transactionData.append("categoryId", category)
                transactionData.append("userId", userId)
                const {data} = await axios.post('/api/v1/transaction/create-transaction',transactionData)
                //onsole.log(data);
                if(data?.success){
                    toast.success("Created Transaction")
                    //update all transactions
                    getAllTransactionsOfUser()
                    //make all fields to empty/default
                    

                }
                else{
                    toast.error("Something went wrong")
                }
          } catch(error){
            console.log(error);
            toast.error("Something went wrong")
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
    useEffect( () => {
       getAllCategories();
       getAllTransactionsOfUser()
    },[])
  return (
     <Layout title={"Transactions - MyApp"}>
        <div className='container mx-auto flex flex-col lg:flex-row overflow-y-scroll items-center lg:items-start '>
            <div className='create-transaction w-[300px] lg:mx-10 lg:w-[400px]'>
                <h1 className='text-2xl font-bold'>Create Transaction</h1>
                <div className='transaction-input border-2  border-black mb-10 rounded-lg'>
                    <form onSubmit={handleCreateTransaction} className='p-5 flex flex-col gap-6'>
                        <input type='number' min='1' className='p-2' placeholder=' Amount' value={amount } onChange={(e) => setAmount(e.target.value)}/>
                        <input type={'text'} className='p-2' placeholder='Description' value={description } onChange={(e) => setDescription(e.target.value)}/>
                        <DatePicker  onChange={(value) => {setDate(value)}
                            } defaultValue={dayjs(formattedDate, dateFormat)} format={dateFormat} />
                        <Select bordered={false} placeholder="Select Transaction type" onChange={(value) => setType(value) } options={[{value : "INCOME", label : "Income"}, {
                            value: "EXPENSE",
                            label: "Expense"
                        }]} >
                            
                        </Select>
                        <Select className='category-dropdown' bordered={false}  placeholder='Select Category' onChange={(value) => setCategory(value) }  >
                            {categories?.map((c) => (
                                <Option value={c._id} key={c._id}>{c.title}</Option>
                            ))}
                        </Select>
                        <button type='submit' className='bg-black px-4 py-2 rounded-lg text-white'>Create</button>
                    </form>

                </div>

            </div>
            <div className='recent-trasactions-cards  overflow-y-scroll'>
                <h1 className='text-2xl text-center font-bold'>Recent Transactions</h1> 
                <div className='cards-section flex flex-row flex-wrap'>
                    {allTransactionsOfUser?.map((tx) =>(
                        <div className="w-full my-5 mx-2 border-l-2 border-b-2 border-black border-solid relative max-w-md  bg-white rounded-lg   shadow-lg overflow-hidden">
                        <div className=" flex  w-full ">
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
                                <BiEdit className='cursor-pointer'/>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                <RiDeleteBinLine className='cursor-pointer' onClick={() => handleDeleteTransaction(tx._id)}/>
                                </IconContext.Provider>
                                
                           </div>
                        </div>
                        
                    </div>

                    ))}
                
                </div>

            </div>
            {/* <div className='all-transactions-container hidden lg:flex lg:flex-col'>
               <h1 className='text-2xl font-bold'>All Transactions</h1> 
               <div className='all-transactions-table '>
               <table class="min-w-[500px] overflow-x-scroll divide-y divide-gray-200">
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
                                 <td className="px-6 py-4 text-left whitespace-nowrap" >{new Date(t.date).toLocaleDateString("en-GB")}</td>
                                 <td className='align-middle text-center'>
                                 <button className='bg-black px-4 py-1 rounded-lg text-white'>
                                        <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                        <BiEdit/>
                                        </IconContext.Provider>
                                 </button>
                                 <button onClick={() => handleDeleteTransaction(t._id)} className='bg-red-700 ml-2 px-4 py-1 rounded-lg text-white'>
                                    <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                    <RiDeleteBinLine/>
                                    </IconContext.Provider>
                                 </button>
                                 </td>
                             </tr>
                         </>
                        ))}
                    </tbody>
                </table>

               </div>
            </div> */}

        </div>

     </Layout>
  )
}

export default CreateTransaction