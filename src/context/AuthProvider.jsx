import { useState, useEffect, createContext } from "react";
import { customFetch } from "../helpers/fetchers";


const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [ loading, setLoading ] = useState(true)
    const [ auth, setAuth ] = useState({})

    useEffect(() => {
        const authenticateUser = async () => {  
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/user`
                const data = await customFetch(url)
                setAuth(data)
                console.log(data)
            
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setLoading(false)
        }
        authenticateUser()
    },[])

    const closeSesion = () => {
        localStorage.removeItem('qv_token') 
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth, loading, closeSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}


export default AuthContext