import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


export default function User() {
  const { closeSesion, auth } = useAuth()
  
  
  return (
    <>
      <main>
        <div className="container mx-auto d-flex flex-lg-row justify-content-between align-items-center mb-2 ">
          <img src="/images/QVITAE-LOGO.png" alt="Logo" className="img-logo-user"/>

          <nav className="d-flex flex-column mt-5 flex-lg-row align-items-center gap-4">
            <Link to={'/user/register-cv'}
              className="color-rosa fs-5 text-decoration-none"
            >
            Registrar cv
            </Link>
            <button type="button"  
              className="custom-button-close"
              onClick={closeSesion}
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
        
        <div className="container mx-auto ">
          <h2 className="">{auth.name} {auth.lastName}</h2>
          <br />
          <h3 className="mt-5">Ahora eres miembro de QVITAE! Llena tu CV</h3>
          <Link to={'/user/register-cv'} className='btn btn-secondary text-white rounded py-2 mt-3 fs-5 fw-bold' > 
            Click aquí para registrar tu cv!
          </Link> 
        </div>
      </main>
      
    </>
  )
}
