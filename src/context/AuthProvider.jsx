import { useState, useEffect, createContext } from "react";
import { customFetch } from "../helpers/fetchers";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [ loading, setLoading ] = useState(true)
    const [ auth, setAuth ] = useState({})

    const navigate = useNavigate()


    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('qv_token')
            
            if(!token){
                setLoading(false)
                return 
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,                  
              }
            }

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
    },[navigate])

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