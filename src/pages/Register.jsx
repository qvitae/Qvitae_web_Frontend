/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Alerts from "../components/Alerts"
// import '../main'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faSnapchat } from '@fortawesome/free-brands-svg-icons'

import useAuth from '../hooks/useAuth'
import { jwtDecode } from "jwt-decode"


export default function Register() {

  const [ name, setName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta] = useState({})
  const { setAuth } = useAuth()
  const navigate = useNavigate()

 

  
  const handleSubmit = async e => {
    e.preventDefault();

    if([name, lastName, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true})
      return 
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Los password no son iguales', error: true})
      return 
    }

    if(password.length < 7){
      setAlerta({msg: 'La contraseña es muy corta, agrega minimo 7 caracteres', error: true})
      return 
      
    }

    setAlerta({})

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/register`;
      const response = await axios.post(url, {
        "name": name,
        "lastName": lastName,
        "email": email,
        "password": password,
      })
      
      if(response.data){
        localStorage.setItem('qv_token', response.data)
        navigate('/user/register-cv')
      }
    
    } catch (error) {
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true 
      })
    }
  }

  const { msg } = alerta
  

  return (
    <>
        <main className="container mx-auto mt-5"> 
            <div className="row align-items-center gap-5">
                <div className="col-md">
                  <img src="/images/QVITAE-LOGO.png" alt="Logo" className="img-logo"/>
                  <p className='fs-4'>Qvitae te conecta con las mejores empresas que buscan tu perfil profesional !!!</p>
                </div>

                        <div className="col-md mt-5 movil" >
                          <div className={`card rounded bg-ligth movil`} >
                            <div className='card-body'>

                            { msg && <Alerts alerta={alerta} />}
                            <form onSubmit={handleSubmit} >

                                <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    Nombre 
                                  </label>
                                  <input type="text" placeholder='Tu Nombre' className='border w-100 bg-light rounded p-2 mt-2' 
                                  value={name}
                                  onChange={(e) => setName(e.target.value)} 
                                  />
                                </div>

                                <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    Apellido
                                  </label>
                                  <input type="text" placeholder='Tu Apellido' className='border w-100 bg-light rounded p-2 mt-2' 
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)} 
                                  />
                                </div>
                                
                                <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    email
                                  </label>
                                  <input type="email" placeholder='Email de Registro' className='border w-100 bg-light rounded p-2 mt-2'  
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)} 
                                  />
                                </div>

                                <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    contraseña
                                  </label>
                                  <input type="password" placeholder='Tu Contraseña' className='border w-100 bg-light rounded p-2 mt-2'  
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)} 
                                  />
                                </div>

                                <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    repite contraseña
                                  </label>
                                  <input type="password" placeholder='Repite Tu Contraseña' className='border w-100 bg-light rounded p-2 mt-2'  
                                  value={repetirPassword}
                                  onChange={(e) => setRepetirPassword(e.target.value)} 
                                  />
                                </div>

                                <input type="submit" value={'Iniciar Sesión'} className='btn btn-secondary  text-white w-100 rounded py-2 mt-3 fs-5 fw-bold' />

                            </form>

                            <nav className="w-100 text-center mt-5">

                              <Link to={'/'} className="d-block my-3 text-decoration-none text-black bg-color-rosa fs-5">
                                ¿Ya tienes una Cuenta? Inicia Sesión!
                              </Link>

                            </nav>


                            </div>
                          </div>
                        </div>
                        
            </div>
        </main>
    </>
  )
}
