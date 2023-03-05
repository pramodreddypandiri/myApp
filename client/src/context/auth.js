import { useState, useEffect, useContext,createContext } from "react";
// creating context for auth
const AuthContext = createContext();
// creating provider for auth
const AuthProvider = ({children}) => {
    // create auth state
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })
    //use useEffect to get user data from local storage
    // and pass to authState
    useEffect(() => {
        const data = localStorage.getItem("auth")
        if(data){
            const parsedData = JSON.parse(data)
            setAuth({
                ...auth,
                user : parsedData?.user,
                token: parsedData?.token
            })
        }
    },[])
    //return a provider with passing state
    return (

        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//create custom hook with auth context 
const useAuth = () => useContext(AuthContext)
export {useAuth, AuthProvider}
