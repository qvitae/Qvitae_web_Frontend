/* eslint-disable no-undef */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBAccordion, MDBAccordionItem, MDBIcon, MDBRow, MDBCol, MDBFile, MDBInput, MDBSwitch,MDBTextArea,MDBTable, MDBCard, MDBCardBody, MDBBtn, MDBRadio } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

import DataPicker from '../components/DataPicker';

import useAuth from "../hooks/useAuth"




export default function CurriculumVitae() {

  
 

  return (
    <>
      <main className='container mx-auto'>

        <div className="container mx-auto d-flex flex-lg-row justify-content-between align-items-center mb-5 ">
          <img src="/images/QVITAE-LOGO.png" alt="Logo" className="img-logo-user"/>

          <nav className="d-flex flex-column mt-5 flex-lg-row align-items-center gap-4">
            <Link to={'/user'}
              className="color-rosa fs-5 text-decoration-none"
            >
            Ir al Perfil
            </Link>
            <button type="button"  
              className="custom-button-close"
              onClick={closeSesion}
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
          
         
      </main>
    </>
    
  )
}
