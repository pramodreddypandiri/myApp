import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';

const Layout = ({children,description, keywords, title,author}) => {
  return (
    <div>
         <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={description}></meta>
                <meta name='keywords' content={keywords}></meta>
                <meta name='author' content={author}></meta>

                <title>{title}</title>
                
            </Helmet>
        <Header/>
          <main>
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