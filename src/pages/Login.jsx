import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alerts from '../components/Alerts'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faSnapchat } from '@fortawesome/free-brands-svg-icons'

import useAuth from '../hooks/useAuth'


export default function Login() {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})
  const [ googleLogin, setGoogleLogin ] = useState(true)

  const { setAuth } = useAuth()

  const navigate = useNavigate()


   // Auth with Google 
  // eslint-disable-next-line react/prop-types
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
      Login
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
    const { email, googleId } = response.profileObj 
    console.log(response.accessToken)
    
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/login`
      const data = await axios.post(url, {email, password:googleId});
      await localStorage.setItem('qv_token', data.token)
      navigate('/user')
      
    } catch (error) {
      console.log(error.response)    
    }
  }

  const onFailure = () => {
    console.log('Ocurrio un error')
  }


  // Auth with Qvitae
  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return 
    }

      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/login`
        const { data } = await axios.post(url, {email, password});
        await localStorage.setItem('qv_token', data.token)
        setAuth(data)
        navigate('/user')

      } catch (error) {
        console.log(error.response.data.message)
        setAlerta({
          msg: error.response.data.message,
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

                
                    {googleLogin ? (
                        <div className="col-md mt-5 movil">
                        <div className='card rounded bg-ligth movil'>
                          <div className='card-body'>
      
                  
                          <form  onClick={handleSubmit} >
                                                      
                          <GoogleLogin                   
                            clientId={clientID}                 
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='token'
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
                            onClick={() => setGoogleLogin(false)}
                          >
                          <img src="/images/QVITAE-LOGO.png" alt="Logo" className="img-qv-logo"/>{' '}
                          Correo
                          </button>
                    </form>
                    <nav className="w-100 text-center mt-5">
                        <Link to={'/register'} className="d-block my-3 text-decoration-none text-black bg-color-rosa fs-5">
                        No te has registrado? Haz click aquí!
                        </Link>
                      </nav>
                    </div>
                    </div>
                    </div>
                    ) : (
                    <div className="col-md mt-5 movil">
                      <div className='card rounded bg-ligth movil'>
                        <div className='card-body'>

                        { msg && <Alerts alerta={alerta} />}    
                        <form  onClick={handleSubmit} >
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

                          <input type="submit" value={'Iniciar Sesión'} className='btn btn-secondary  text-white w-100 rounded py-2 mt-3 fs-5 fw-bold' />

                          <GoogleLogin   
                          google                
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
                        <Link to={'/register'} className="d-block my-3 text-decoration-none text-black bg-color-rosa fs-5">
                        No te has registrado? Haz click aquí!
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
