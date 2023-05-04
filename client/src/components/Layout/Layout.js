import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";

const Layout = ({children,description, keywords, title,author}) => {
  const location = useLocation();
  const currentUrl = location.pathname;
  //send active property for making nav-bar active.
  let activeHome;
  let activeSignup;
  let activeLogin;
  let activeMyHome ;
  let activeManage;
  let activeAnalytics;
  //console.log(currentUrl);
  if(currentUrl.includes("myhome")) { activeMyHome = true;}
  else if(currentUrl.includes("manage")) { activeManage = true;}
  else if(currentUrl.includes("analytics")) { activeAnalytics = true;}
  else if(currentUrl.includes("signup")) { activeSignup = true;}
  else if(currentUrl.includes("login")) { activeLogin = true;}
  else if(currentUrl === '/') { activeHome = true;}
  return (
    <div className=''>
         <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={description}></meta>
                <meta name='keywords' content={keywords}></meta>
                <meta name='author' content={author}></meta>

                <title>{title}</title>
                
            </Helmet>
        <Header activeLogin={activeLogin} activeHome ={activeHome} activeSignup ={activeSignup} activeMyHome= {activeMyHome} activeManage={activeManage} activeAnalytics={activeAnalytics}/>
          <main className=''>
          <Toaster />
             {children}
          </main>
        
        <Footer/>
    </div>

  )
}
//set default PROPS for layout
Layout.defaultProps={
  title:"My Money App",
  description: 'All your transactions at one place',
  keywords:"money,expenses,transactions,income",
  author:"pramodreddypandiri"
}
export default Layout