import { Link } from "react-router-dom"


export default function Header() {
  return (
    <header className="header py-4">
        <div className="container mx-auto d-flex flex-lg-row justify-content-between align-items-center ">
          <Link to={''} className="text-white fs-2 text-decoration-none">
            Qvitae
          </Link>

            <nav className="d-flex flex-column flex-lg-row align-items-center gap-4">
              <a
              href="https://qvitae.org.do/" target="blank"
              className="text-white fs-5 uppercase text-decoration-none"
              >
              QVITAE.ORG.DO
              </a>
              <span
              
              className="text-white fs-5 uppercase text-decoration-none"
              >
              +1 (809) 877-0157
              </span>
            </nav>
        </div>
    </header>
  )
}
