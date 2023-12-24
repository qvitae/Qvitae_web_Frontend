import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [ loading, setLoading ] = useState(true)
    const [ auth, setAuth ] = useState({})

    useEffect(() => {
        const authenteUser = async () => {
            const token = localStorage.getItem('qv_token')
            const username = localStorage.getItem('username')
            
            if(!token){
                setLoading(false)
                return 
            }

            const config = {
                headers: {
                  "Content-type": "application/json"                   
              }
            }
  
           try {
            const uri = `https://www.qvitae.com.do/jsonapi/user/user?filter[name]=${username}`
            const response = await axios.get(uri, config)
            console.log(response.data.data[0])
            setAuth(response.data.data[0].attributes)
           } catch (error) {
            setAuth({})
           }

           setLoading(false)
        }
        authenteUser()
    },[])

    const closeSesion = () => {
        localStorage.removeItem('qv_token')
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        localStorage.removeItem('img_fid')
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