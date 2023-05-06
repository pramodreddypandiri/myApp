
import Layout from '../../components/Layout/Layout'
import ManageMenu from '../../components/Layout/ManageMenu'
const Manage = () => {
    
  return (
    <Layout title={"Manage - My App"}>
        <div className='container min-h-screen mx-auto flex'>
           <ManageMenu/>
        </div>
    </Layout>
  )
}

export default Manage