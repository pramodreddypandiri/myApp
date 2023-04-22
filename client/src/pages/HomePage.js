import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth,setAuth] = useAuth();

  return (
    <Layout title={'Welcome'}>
        <div className='container flex mx-auto'>
          <div>
            <p></p>
          </div>
        </div>
        
    </Layout>
  )
}

export default HomePage