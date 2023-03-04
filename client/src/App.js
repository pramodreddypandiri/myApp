import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js'
import Contact from './pages/Contact.js'
import Policy from './pages/Policy.js'
import PageNotFound from './pages/PageNotFound.js'
import Register from "./pages/Auth/Register.js";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Routes>
        <Route exact="true" path='/' element={<HomePage/>} />
        <Route exact="true" path='/contact' element={<Contact/>}/>
        <Route exact="true" path='/policy' element={<Policy/>} />
        <Route exact="true" path='/register' element={<Register/>} />
        <Route  path='/*'
        element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
