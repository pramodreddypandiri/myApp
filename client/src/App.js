import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js'
import Contact from './pages/Contact.js'
import Policy from './pages/Policy.js'
import PageNotFound from './pages/PageNotFound.js'
function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/policy' element={<Policy/>} />
        <Route exact path='/*'
        element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
