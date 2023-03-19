import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { Select } from 'antd'
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
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
        <div className='container mx-auto flex flex-row gap-10'>
            <div className='create-transaction w-[300px]'>
                <h1 className='text-2xl font-bold'>Create Transaction</h1>
                <div className='transaction-input border-2  border-black my-10 rounded-lg'>
                    <form onSubmit={handleCreateTransaction} className='p-5 flex flex-col gap-6'>
                        <input type='number' min='1' className='p-2' placeholder=' Amount' value={amount } onChange={(e) => setAmount(e.target.value)}/>
                        <input type={'text'} className='p-2' placeholder='Description' value={description } onChange={(e) => setDescription(e.target.value)}/>
                        <DatePicker  onChange={(value) => {setDate(value)}
                            } defaultValue={dayjs(formattedDate, dateFormat)} format={dateFormat} />
                        <Select bordered={false} onChange={(value) => setType(value) } options={[{value : "INCOME", label : "Income"}, {
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
            <div className='all-transactions-container'>
               <h1 className='text-2xl font-bold'>All Transactions</h1> 
               <div className='all-transactions-table'>
               <table class="min-w-[500px] divide-y divide-gray-200">
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

        </div>

     </Layout>
  )
}

export default CreateTransaction