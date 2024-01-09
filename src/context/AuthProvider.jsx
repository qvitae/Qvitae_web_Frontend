import { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";
import clientAxios from "../helpers/axios";

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

            try {
                
                const response = await clientAxios.get('/user')
                setAuth(response.data)
                
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