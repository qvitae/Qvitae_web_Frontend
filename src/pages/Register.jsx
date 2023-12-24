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

  const [ fullname, setFullName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ user, setUser ] = useState('')
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
    const { name, email, googleId, givenName, imageUrl } = response.profileObj
    
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/user/register?_format=json`;
      const response = await axios.post(url, {
        "name":[{"value": givenName}],
        "mail":[{"value": email}],
        "field_fullname": [{"value": name}],
        "pass":[{"value": googleId}],
        "user_picture": [{"value": imageUrl}]
    })
      console.log(response)

      const urllogin = `${import.meta.env.VITE_BACKEND_URL}/user/login?_format=json`
      const data = await axios.post(urllogin, 
      {name:email, pass:googleId});
      await localStorage.setItem('qv_token', data.data.csrf_token)
      await localStorage.setItem('username', data.data.current_user.name)
        

      if(!data.data.csrf_token) return
          
      const config = {
        headers: {
          "Content-type": "application/json"                   
        }
      }   

      const uri = `${import.meta.env.VITE_BACKEND_URL}/jsonapi/user/user?filter[name]=${data.data.current_user.name}`
      const respuesta = await axios.get(uri, config)
      await localStorage.setItem('id', response.data.data[0].id)
      console.log(respuesta.data.data[0])
      setAuth(respuesta.data.data[0].attributes)

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

    if([fullname, email, user, password, repetirPassword].includes('')){
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

    // Crear el usuario en el api
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/user/register?_format=json`;
      const respuesta = await axios.post(url, {
        "name":[{"value": user}],
        "mail":[{"value": email}],
        "field_fullname": [{"value": fullname}],
        "pass":[{"value": password}],
        "user_picture": [{"value":''}]
      })
      console.log(respuesta)
    
      const urllogin = `${import.meta.env.VITE_BACKEND_URL}/user/login?_format=json`
      const  data  = await axios.post(urllogin, 
        {name:email, pass:password});
        await localStorage.setItem('qv_token', data.data.csrf_token) 
        await localStorage.setItem('username', data.current_user.name)       
        console.log(data)

        if(!data.data.csrf_token) return

        const config = {
          headers: {
            "Content-type": "application/json"                   
          }
        }   
        
      const uri = `${import.meta.env.VITE_BACKEND_URL}/jsonapi/user/user?filter[name]=${data.data.current_user.name}`
        const response = await axios.get(uri, config)
        console.log(response.data.data[0])
        await localStorage.setItem('id', response.data.data[0].id)
        setAuth(response.data.data[0].attributes)
  
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

                      {googleRegister ? (
                        <div className="col-md mt-5 movil" >
                          <div className={`card rounded bg-ligth movil`} >
                            <div className='card-body'>

                            { msg && <Alerts alerta={alerta} />}
                              <form onClick={handleSubmit} >

                              <GoogleLogin
                              clientId={clientID}
                              onSuccess={onSuccess}
                              onFailure={onFailure}
                              cookiePolicy={'single_host_origin'}
                              render={(renderProps) => (
                                <CustomGoogleLoginButton onClick={renderProps.onClick} />
                              )}
                              />

                              <button className='facebook-button'>
                                <FontAwesomeIcon icon={faFacebook} />{' '}
                                FaceBook
                              </button>

                              <button className='snapchat-button'>
                                <FontAwesomeIcon icon={faSnapchat} />{' '}
                                Snapchat 
                              </button>

                              <button to={''} className="qv-button"
                                onClick={() => setGoogleRegister(false)}
                              >
                              <img src="/images/QVITAE-LOGO.png" alt="Logo" className="img-qv-logo"/>{' '}
                              Correo
                              </button>

                              </form>
                              <nav className="w-100 text-center mt-5">
                           
                                <Link to={'/'} className="d-block my-3 text-decoration-none text-black bg-color-rosa fs-5">
                                ¿Ya tienes una Cuenta? Inicia Sesión!
                                </Link>
                             </nav>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-md mt-5 movil" >
                          <div className={`card rounded bg-ligth movil`} >
                            <div className='card-body'>

                            { msg && <Alerts alerta={alerta} />}
                            <form onClick={handleSubmit} >

                              <div className='my-3'>
                                  <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                                    Nombre Completo
                                  </label>
                                  <input type="text" placeholder='Tu Nombre y Apellido' className='border w-100 bg-light rounded p-2 mt-2' 
                                  value={fullname}
                                  onChange={(e) => setFullName(e.target.value)} 
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
                                    Nombre de Usuario
                                  </label>
                                  <input type="text" placeholder='Tu Usuario' className='border w-100 bg-light rounded p-2 mt-2' 
                                  value={user}
                                  onChange={(e) => setUser(e.target.value)} 
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
                                  

                                <GoogleLogin
                                  clientId={clientID}
                                  onSuccess={onSuccess}
                                  onFailure={onFailure}
                                  cookiePolicy={'single_host_origin'}
                                  render={(renderProps) => (
                                    <CustomGoogleLoginButton onClick={renderProps.onClick} />
                                  )}
                                />

                            </form>

                              <nav className="w-100 text-center mt-5">

                                <Link to={'/'} className="d-block my-3 text-decoration-none text-black bg-color-rosa fs-5">
                                ¿Ya tienes una Cuenta? Inicia Sesión!
                                </Link>

                              </nav>


                            </div>
                          </div>
                        </div>
                      )}

                      
                 
            </div>
        </main>
    </>
  )
}
