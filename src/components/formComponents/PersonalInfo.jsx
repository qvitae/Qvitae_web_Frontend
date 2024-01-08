import React from "react";
import { MDBAccordion, MDBAccordionItem, MDBRow, MDBCol, MDBFile, MDBInput, MDBSwitch,MDBTextArea,MDBTable, MDBCard, MDBCardBody, MDBBtn, MDBRadio } from 'mdb-react-ui-kit';

import DataPicker from '../../components/DataPicker';
import { actions } from "../../context/CvFormProvider";
import { useFormData } from "../../hooks/useFormData";
import AddressForm from "./AddressForm";
  

export default function PersonalInfo({availableHobbies, isLoading, countries = []}) {

  let avatar = false
  const {formState, formDataManager} = useFormData(),
      {name, lastName, personalData, hobbies} = formState,
      {birthDate, identificationId, phoneNumber ,alternativeEmail, handicapped, gender} = personalData


  const toggleDisability = () => 
    formDataManager({type: actions.setPersonalData, personalData:{...personalData, handicapped:!handicapped}}),

  changeSomePersonalData = (values) => 
    formDataManager({type: actions.setPersonalData, personalData: {...personalData, ...values}}),
  
  toggleGender = (event) =>
    formDataManager({type: actions.setPersonalData, personalData: {...personalData, gender: event.target.value}})  

  

  return (<MDBAccordion>
      <MDBAccordionItem collapseId={1} headerTitle={<><i className="icon bi-person text-primary" /> &nbsp; Información personal 
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
            {isLoading? 
              <h2 className="text-center">Cargando...</h2>
              :
              availableHobbies?.map(hobby => (
                <div key={hobby.id}>
                  <MDBSwitch 
                    id={`hobbySwitch${hobby.id}`}
                    label={hobby.name}
                    checked={hobbies.some(userHobby => userHobby.hobbyId === hobby.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        formDataManager({type: actions.addHobby, hobbyId: hobby.id})
                      }else {
                        formDataManager({type: actions.removeHobby, hobbyId: hobby.id})
                      }
                    }}
                  />
                  <br />
                </div>
              ))
            }
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
                  value={birthDate || new Date()} onChange={(e) => changeSomePersonalData({birthDate: e.target.value})}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow className='mb-5'>
              <MDBCol lg="4" className='mb-3'>
                <MDBInput label='Cédula' id='typeText' type='text' 
                  value={identificationId || ''} onChange={(e) => changeSomePersonalData({identificationId: e.target.value})}
                />
              </MDBCol>
              <MDBCol lg="4" className='mb-3'>
                <MDBInput label='Teléfono' id='typeText' type='text ' 
                  value={phoneNumber || ''} onChange={(e) => changeSomePersonalData({phoneNumber: e.target.value})}
                />
              </MDBCol>
              <MDBCol lg="4">
                <MDBInput label='Otro correo' id='typeEmail' type='email' 
                  value={alternativeEmail || ''} onChange={(e) => changeSomePersonalData({alternativeEmail: e.target.value})}
                />
              </MDBCol>
            </MDBRow>

              <AddressForm countries={countries}/>

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
                <MDBSwitch id='flexSwitchCheckDefault' label={handicapped? 'No' : 'Sí'} value="No" checked={handicapped} onChange={toggleDisability}/>
              </MDBCol>
            </MDBRow>
            
          </MDBCol>
        </div>
      </div>
        
        
      </MDBAccordionItem>
    </MDBAccordion>)
}