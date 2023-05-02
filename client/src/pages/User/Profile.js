import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
import { useAuth } from '../../context/auth'
const Profile = () => {
    const [auth, setAuth] = useAuth()
    //console.log(auth);
    const [name, setEditedName] = useState(auth?.user?.name)
    const [email, setEditedEmail] = useState(auth?.user?.email)
    const [profession, setProfession] = useState(auth?.user?.profession)
    const [income, setIncome] = useState(auth?.user?.income)
    //console.log(auth?.user)
    // edit profile method
    const handleEditProfile = async (e) => {
      e.preventDefault()
      try{
        const res  = await axios.post(`/api/v1/auth/update-profile/${auth?.user?._id}`,{name, email, profession, income})
        if(res && res?.data?.success){
          //console.log(res?.data);
          toast.success("Profile Updated")
          
        }
      } catch (error){
        console.log(error);
        toast.error("Something went wrong")
      }
    }
  return (
    <Layout title={'Manage - My Profile'}>
        <div className='flex w-ull flex-col  lg:flex-row '>
            <div className=''>
                 <ManageMenu category={false} profile={true} />
            </div>
            <div className='lg:ml-10 p-2 lg:mt-10'>
                <h4 className='text-2xl font-bold'>My Profile</h4>
                <form onSubmit={handleEditProfile} className='flex flex-col mx-auto gap-5'>
                  <input placeholder='Name' className='border-2 border-black p-2 rounded-lg w-full' type='text' value={name} onChange={(e) => setEditedName(e.target.value)}/>
                  <input  placeholder='Email' className='border-2 border-black p-2 rounded-lg w-full' type='email' value={email} onChange={(e) => setEditedEmail(e.target.value)}/>
                  <input  placeholder='Profession' className='border-2 border-black p-2 rounded-lg w-full' type='text' value={profession} onChange={(e) => setProfession(e.target.value)}/>
                  <input  placeholder='Montly Income'  className='border-2 border-black p-2 rounded-lg w-full' type='number' value={income} onChange={(e) => setIncome(e.target.value)}/>
                  <div>
                    <button type='submit' className='uppercase w-full text-white bg-black rounded-lg p-2 '>Edit</button>
                </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Profile