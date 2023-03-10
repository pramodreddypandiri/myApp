import React from 'react'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'

const CreateCategory = () => {
  return (
    <Layout title={'Manage - Create Category'}>
        <div className='flex flex-row items-start'>
            <div>
                <div>
                    <ManageMenu/>
                </div>
            </div>
            <div className='ml-10 mt-10'>
                <h4 className='text-2xl font-semibold'>Create Category</h4>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory