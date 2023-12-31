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


export default function Register() {

  const [ name, setName ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ googleRegister, setGoogleRegister ] = useState(true)

  const [ alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()
  
  const navigate = useNavigate()

  // Google login
  const CustomGoogleLoginButton = ({ onClick }) => (
    
    <button 
    style={{
      width: '100%',
      backgroundColor: '#ff2db6', 
      color: 'white',
      border: 'none',
      padding: '4px 4px',   
      borderRadius: '5px',    
      fontSize: '1.25rem',       
      fontWeight: 'bold',         
      marginTop: '1rem',         
    }} 
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faGoogle} />{' '}
      Registrate
    </button>
  );

  const clientID = `${import.meta.env.VITE_CLIENT_ID}`;

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID
      })
    }
    gapi.load("client:auth2", start)
  },[])

  const onSuccess = async (response) => {
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj
    
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/register`;
      const response = await axios.post(url, {
        "name": givenName,
        "lastname": familyName,
        "mail": email,
        "password": googleId,
        "image": imageUrl
    })


      const urllogin = `${import.meta.env.VITE_BACKEND_URL}/api/login`
      const data = await axios.post(urllogin, {name:email, pass:googleId});
      await localStorage.setItem('qv_token', data.data.csrf_token)
      navigate('/user/register-cv')

    } catch (error) {
      setAlerta({msg: 'Ocurrio un error', error: true})
      console.log(error)
    }
     
  }

  const onFailure = () => {
    setAlerta({msg: 'Ocurrio un error', error: true})
    
  }



  const handleSubmit = async e => {
    e.preventDefault();

    if([name, lastname, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true})
      return 
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Los password no son iguales', error: true})
      return 
    }

    if(password.length < 4){
      setAlerta({msg: 'La contraseña es muy corta, agrega minimo 7 caracteres', error: true})
      return 
      
    }

    setAlerta({})

   
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/register`;
      const respuesta = await axios.post(url, {
        "name": name,
        "lastname": lastname,
        "mail": email,
        "password": password,
        "image": image
      })
    
      const urllogin = `${import.meta.env.VITE_BACKEND_URL}/api/login`
      const  data  = await axios.post(urllogin, {name:email, pass:password});
      await localStorage.setItem('qv_token', data.data.csrf_token)           
      navigate('/user/register-cv')

    } catch (error) {
      console.log(error)
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
                            <form onClick={handleSubmit} >

                                <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    Nombre 
                                  </label>
                                  <input type="text" placeholder='Tu Nombre' className='border w-100 bg-light rounded p-2 mt-2' 
                                  value={name}
                                  onChange={(e) => setFullName(e.target.value)} 
                                  />
                                </div>

                                <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    Apellido
                                  </label>
                                  <input type="text" placeholder='Tu Apellido' className='border w-100 bg-light rounded p-2 mt-2' 
                                  value={lastname}
                                  onChange={(e) => setUser(e.target.value)} 
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
