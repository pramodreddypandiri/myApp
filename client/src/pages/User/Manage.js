import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
const Manage = () => {
    const [category, setCategory] = useState();
  return (
    <Layout title={"Manage - My App"}>
        <div>
        <ManageMenu/>
        </div>
    </Layout>
  )
}

export default Manage