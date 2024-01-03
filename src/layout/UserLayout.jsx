import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

import useAuth from "../hooks/useAuth"


export default function AuthLayout() {

  const token = localStorage.getItem('qv_token')

  const { auth, loading } = useAuth()
  

  if(loading) return 'Cargando!!!'

  return (
    <>
            <Header />
              <Outlet />
            <Footer /> 
        {/*token ? 
          <>
          </>
          : < Navigate to={'/'} />
        */}
       
    </>
   
  )
}