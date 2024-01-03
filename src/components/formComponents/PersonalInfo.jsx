import React, { useEffect, useState } from "react";
import { MDBAccordion, MDBAccordionItem, MDBIcon, MDBRow, MDBCol, MDBFile, MDBInput, MDBSwitch,MDBTextArea,MDBTable, MDBCard, MDBCardBody, MDBBtn, MDBRadio } from 'mdb-react-ui-kit';

import DataPicker from '../../components/DataPicker';
import { actions, useFormData } from "../../context/CvFormProvider";
import AddressForm from "./AddressForm";

  const availableHobbies = [
      "Correr",
      "Nadar",
      "Gimnasio",
      "Leer",
      "Cantar",
      "Teatro",
      "Bicicleta",
      "Equitación",
      "Cocinar",
      "Ver TV",
      "Ir al Cine",
      "Ir de Compras",
      "Tocar Instrumento"
    ];
    

  

export default function PersonalInfo() {

  let avatar = false
  const {formState, formDataManager} = useFormData(),
      {name, lastName, personalData, address:totalAddress, hobbies} = formState,
      {birth_date, identification_id, phoneNumber ,alternativeEmail, handicapped, gender} = personalData


  const toggleDisability = () => 
    formDataManager({type: actions.setPersonalData, personalData:{...personalData, handicapped:!handicapped}}),

  changeSomePersonalData = (values) => 
    formDataManager({type: actions.setPersonalData, personalData: {...personalData, ...values}}),
  
  toggleGender = (event) =>
    formDataManager({type: actions.setPersonalData, personalData: {...personalData, gender: event.target.value}})  

  

  return (<MDBAccordion>
      <MDBAccordionItem collapseId={1} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Información personal 
      </>}>
      <div className='row pt-3'>
        <div className='col-12 col-md-3 d-flex justify-content-center flex-wrap'>
          <div className="w-100 d-flex flex-column align-items-center">
            {avatar ? (
                <img src={avatar} className='img-fluid rounded' alt='' />
              ) : (
                <div className='border rounded p-3 text-center' style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  Foto de Perfil
                </div>
              )
            }
          <div className='mt-2'>
            {avatar ? (
              <div className='md-3'>
                <MDBFile 
                  id='customFile' 
                  /*onChange={uploadAvatar} */
                />
              </div> 
            ) : (
              <div className='boton-avatar'>
                <MDBFile 
                id='customFile' 
                /*onChange={uploadAvatar} */ />
              </div> 
            )}
          </div>
          </div>  
          
      
          <MDBCol className="w-100 col-12 col-md-3" style={{maxHeight: '50%', overflowY: 'scroll'}}>  
            <div className='fs-5'>Pasatiempo</div>
            <br />
            {availableHobbies.map((hobby, index) => (
              <div key={index}>
                <MDBSwitch 
                  id={`hobbySwitch${index}`}
                  label={hobby}
                  checked={hobbies.find(hobby => hobby.hobbyId === index)}
                  onChange={e => {
                    if (e.target.checked) {
                      formDataManager({type: actions.addHobby, hobbyId: index})
                    }else {
                      formDataManager({type: actions.removeHobby, hobbyId: index})
                    }
                  }}
                />
                <br />
              </div>
            ))}
          </MDBCol>
        </div>

        <div className='col-12 col-md-9'>
          <MDBCol>

            <MDBRow className='mb-5'>
              <MDBCol lg="4" className='mb-3'>
                <MDBInput label='Nombre' id='typeText' type='text' 
                  value={name || ''} onChange={(e) => formDataManager({type: actions.setName, value: e.target.value})}
                /> 
              </MDBCol>
              <MDBCol lg="4" className='mb-3'>
                <MDBInput label='Apellido' id='typeText' type='text' 
                  value={lastName || ''} onChange={(e) => formDataManager({type: actions.setLastName, value: e.target.value})}
                />
              </MDBCol>
              <MDBCol lg="4">
                <DataPicker 
                  value={birth_date || new Date()} onChange={(e) => changeSomePersonalData({birth_date: e.target.value})}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow className='mb-5'>
              <MDBCol lg="4" className='mb-3'>
                <MDBInput label='Cédula' id='typeText' type='text' 
                  value={identification_id || ''} onChange={(e) => changeSomePersonalData({identification_id: e.target.value})}
                />
              </MDBCol>
              <MDBCol lg="4" className='mb-3'>
                <MDBInput label='Teléfono' id='typeText' type='text ' 
                  value={phoneNumber || ''} onChange={(e) => changeSomePersonalData({phone_number: e.target.value})}
                />
              </MDBCol>
              <MDBCol lg="4">
                <MDBInput label='Otro correo' id='typeEmail' type='email' 
                  value={alternativeEmail || ''} onChange={(e) => changeSomePersonalData({alternative_email: e.target.value})}
                />
              </MDBCol>
            </MDBRow>

            <AddressForm/>

            <MDBRow>
              <MDBCol>  
                <div className='fs-5'>Género</div>
                <br />
                <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Masculino' value="m" checked={gender === 'm'}  onChange={toggleGender} />
                <br />
                <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Femenino' value="f" checked={gender  === 'f'}  onChange={toggleGender} />
              </MDBCol>

              <MDBCol>  
                <div className='fs-5'>Discapacidad</div>
                <br />
                <MDBSwitch id='flexSwitchCheckDefault' label={handicapped? 'No' : 'Sí'} value="No" onChange={toggleDisability}/>
              </MDBCol>
            </MDBRow>
            
          </MDBCol>
        </div>
      </div>
        
        
      </MDBAccordionItem>
    </MDBAccordion>)
}