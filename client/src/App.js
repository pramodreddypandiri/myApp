import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js'
import Contact from './pages/Contact.js'
import Policy from './pages/Policy.js'
import PageNotFound from './pages/PageNotFound.js'
import Register from "./pages/Auth/Register.js";

import Login from "./pages/Auth/Login.js";
import MyHome from "./pages/User/MyHome.js";
import PrivateRoute from "./components/Routes/PrivateRoute.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import Dashboard from "./pages/User/Dashboard.js";
import Manage from "./pages/User/Manage.js";
import CreateCategory from "./pages/User/CreateCategory.js";
import SetCurrency from "./pages/User/SetCurrency.js";
import Profile from "./pages/User/Profile.js";
import CreateTransaction from "./pages/User/CreateTransaction.js";
import AllTransactions from "./pages/User/AllTransactions.js";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/myhome" element={<PrivateRoute/>}>
           <Route  path='' element={<CreateTransaction/>} /> 
           <Route  path='all-transactions' element={<AllTransactions/>} /> 
        </Route>
        <Route path="/manage" element={<PrivateRoute/>}>
           <Route  path='settings' element={<Manage/>} /> 
           <Route  path='settings/create-category' element={<CreateCategory/>} /> 
           <Route  path='settings/set-currency' element={<SetCurrency/>} /> 
           <Route  path='settings/myprofile' element={<Profile/>} /> 
        </Route>
        <Route path="/analytics" element={<PrivateRoute/>}>
           <Route  path='user' element={<Dashboard/>} /> 
        </Route>
        
        <Route path="/analytics" element={<AdminRoute/>}>
           <Route  path='dashboard' element={<Dashboard/>} /> 
           
        </Route>
        
        <Route exact="true" path='/contact' element={<Contact/>}/>
        <Route exact="true" path='/policy' element={<Policy/>} />
        <Route exact="true" path='/signup' element={<Register/>} />
        <Route exact="true" path='/login' element={<Login/>} />
        <Route exact="true" path='/forgot-password' element={<ForgotPassword/>} />
        <Route  path='/*'
        element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
