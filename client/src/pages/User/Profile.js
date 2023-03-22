import React from 'react'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
import { useAuth } from '../../context/auth'
const Profile = () => {
    const [auth, setAuth] = useAuth()
  return (
    <Layout title={'Manage - My Profile'}>
        <div className='flex flex-row items-start'>
            <div className='w-[25%]'>
                 <ManageMenu />
            </div>
            <div className='ml-10 mt-10'>
                <h4 className='text-2xl font-semibold'>My Profile</h4>
                <p>{auth?.user?.name}</p>
                <p>{auth?.user?.email}</p>
                <p>{auth?.user?.role}</p>
                <p>{auth?.user?.profession}</p>
                <p>{auth?.user?.income}</p>
            </div>
        </div>
    </Layout>
  )
}

export default Profile