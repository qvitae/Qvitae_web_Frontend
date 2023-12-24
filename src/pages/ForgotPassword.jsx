import { Link } from "react-router-dom"

export default function ForgotPassword() {
  return (
    <>
    
      <main className="container mx-auto mt-5">
            
          <div className="row align-items-center ">

                <div className="col-md mt-5">
                  <h2>QVITAE</h2>
                  <p className='fs-4'>Qvitae te conecta con las mejores empresas que buscan tu perfil profesional !!!</p>
                </div>
                <div className="col-md mt-5 movil">
                  <div className='card rounded bg-ligth movil'>
                    <div className='card-body'>
                      <form action="">
                        <div className='my-3'>
                          <label htmlFor="" className='fs-5 text-uppercase fw-bold d-block'>
                            email
                          </label>
                          <input type="email" placeholder='Email de Registro' className='border w-100 bg-light rounded p-2 mt-2'  />
                        </div>

                        <input type="submit" value={'Envia Intrucciones'} className='btn btn-secondary text-white w-100 rounded py-2 mt-3 fs-5 fw-bold ' />
                      </form>

                      <nav className="w-100 text-center mt-5">
                        <Link to={'/'} className="d-block my-3 text-decoration-none text-black bg-color-rosa">
                        ¿Tienes una Cuenta? Inicia Sesión!
                        </Link>
                        <Link to={'/register'} className="d-block my-3 text-decoration-none text-black bg-color-rosa">
                        ¿No tienes una Cuenta? Regístrate!
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
