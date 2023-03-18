import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth,setAuth] = useAuth();

  return (
    <Layout title={'Welcome'}>
        <h1> Home Page</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
        <h1>{JSON.stringify(auth.user._id)}</h1>
    </Layout>
  )
}

export default HomePage