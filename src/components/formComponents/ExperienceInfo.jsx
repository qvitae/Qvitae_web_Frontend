import React, { useEffect, useState } from "react"
import { MDBAccordion, MDBAccordionItem, MDBIcon, MDBRow, MDBCol, MDBInput, MDBSwitch,MDBTextArea, MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import { actions } from "../../context/CvFormProvider";
import { useFormData } from "../../hooks/useFormData";

import { Form } from "react-bootstrap";
import LanguagesForm from "./languagesForm";
import JobsForms from "./jobsForms";


const softSkillsAvailable = [
  { name: "Inteligencia Emocional", id: 1 },
  { name: "Capacidad de Negociación", id: 2 },
  { name: "Creatividad", id: 3 },
  { name: "Manejo del Tiempo", id: 4 },
  { name: "Nivel de Urgencia", id: 5 },
  { name: "Liderazgo", id: 6 },
  { name: "Comunicación Efectiva", id: 7 },
  { name: "Capacidad de Adaptación", id: 8 },
  { name: "Pensamiento Crítico", id: 9 },
  { name: "Solución de Problemas", id: 10 },
  { name: "Ética Laboral", id: 11 }
],

carreras = [
  { id: "1", name: "Ingenieria en Sistemas" },
  { id: "2", name: "Tecnólogo en Software" },
  { id: "3", name: "Tecnólogo en Redes" },
  { id: "4", name: "Tecnólogo en Seguridad Informática" },
  { id: "5", name: "DISTRITO NACIONAL" },
  { id: "6", name: "Administrador de Bases de Datos" },
  { id: "7", name: "Arquitecto" },
  { id: "8", name: "Ingeniero Eléctrico, Electromecánico, Robótica" },
  { id: "9", name: "Ingeniero Civil" },
  { id: "10", name: "Ingeniero Industrial" },
  { id: "11", name: "Medicina" },
  { id: "12", name: "Bío-Analista" },
  { id: "13", name: "Enfermería" },
  { id: "14", name: "Contabilidad Finanzas" },
  { id: "15", name: "Administrador de Empresas" },
  { id: "16", name: "Relaciones Internacionales" },
  { id: "17", name: "Hotelería y Turismo" },
  { id: "18", name: "Mercadeo" },
  { id: "19", name: "Maestro" },
  { id: "20", name: "Psicología" },
  { id: "21", name: "Abogado" },
  { id: "22", name: "Asistente" },
  { id: "23", name: "Secretaria" },
  { id: "24", name: "Chofer" }
]

function useFetchCareers() {
  const [careers, setCareers] = useState([]),
      [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      
      setCareers(carreras)
      setLoading(false)
    }, 5000)


  }, [])

  return [careers, isLoading]
}

function useFetchSoftSkils() {
  const [softSkills, setCareers] = useState([]),
      [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      
      setCareers(softSkillsAvailable)
      setLoading(false)
    }, 5000)


  }, [])

  return [softSkills, isLoading]
}






export default function ExperienceInfo({languages, careers, softSkills, isLoading}) {

    const {formState, formDataManager} = useFormData(),
          {softSkills:userSkills, personalData, userReferences = []} = formState,
          {experience} = formState.career,

        handlePersonalDescription = (ev) =>{
          let value = ev.target.value
          formDataManager({type: actions.setPersonalData, personalData: {...personalData, personalDescription: value}})
        },
        changeSomeReference = (reference, values) => {
          formDataManager({type: actions.setReference, reference, selectedReference: {...reference, ...values}})
        }


    return <MDBAccordion>
    <MDBAccordionItem collapseId={1} headerTitle={<><i className="icon bi-file-earmark-text text-primary" /> &nbsp; Experiencia laboral</>}>
      

      <div className='row pt-3 '>

        <div className='col-md-4 empujando-abajo'>
            <MDBCol>

              <MDBRow>

                <MDBCol className=" h-25 d-flex flex-column flex-wrap align-items-start">
                  <div className='fs-5 w-100'>Habilidades Blandas</div>
                  
                    {!isLoading? softSkills?.map(skill => (
                      <div key={skill.id}>
                        <MDBSwitch 
                          id={`flexSwitchCheckDefault${skill.id}`} 
                          label={skill.name} 
                          checked={userSkills.find(userSkill => userSkill.softSkillId == skill.id)} // Asegúrate de que el estado del switch refleje el valor actual de la habilidad
                          onChange={e => e.target.checked? 
                            formDataManager({type: actions.addSoftSkill, skillId: skill.id}) 
                            : 
                            formDataManager({type: actions.removeSoftSkill, skillId: skill.id})} 
                        />
                      </div>
                    )) :
                        <div className="mx-auto">Cargando...</div>    
                    }
                    {!isLoading && softSkills?.length == 0 && <> <div className="mx-auto"> Sin habilidades blandas </div> </>}
                    <div className="col-12 ">
                      <LanguagesForm languages={languages} />
                    </div>

                </MDBCol>
                
              </MDBRow>
            </MDBCol>
        </div>

        <div className='col-md-8 '>
            <MDBCol>
              <h2>Información profesional</h2>
              <MDBRow className='mb-5'>
                <MDBCol lg="4" className='mb-3'>
                  <Form.Select onChange={e => {
                    formDataManager({type: actions.setCareer, values: {career: e.target.value}})
                  }}>
                    <option>{ isLoading? 'Cargando...' : 'Profesión'}</option>
                    {
                      careers?.map(career =>
                        <option key={career.id} value={career.id} >{career.name}</option>  
                      )
                    }

                  </Form.Select>
                </MDBCol>

                <MDBCol lg="4">
                  <MDBInput label='Años de Experiencia' id='typeNumber' type='number' 
                    value={experience} onChange={(e) => {
                      if (Number.isNaN(Number(e.target.value))) console.log('error')

                      formDataManager({type: actions.setCareer, values: {experience: Math.abs(Number(e.target.value))}})
                    }}
                  />
                </MDBCol>

              </MDBRow>

              <MDBRow className='mb-4'>
                <MDBCol>
                  <MDBTextArea label='Descripción' style={{maxHeight: '150px'}} id='textAreaExample' rows={4} 
                    value={personalData.personalDescription} onChange={handlePersonalDescription}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className='mb-4'>
                <MDBCol>
                  <h2> Trabajos Recientes </h2>
                  <div className="w-100 d-inline-flex" style={{minHeight: '500px', overflowX: "scroll"}}>

                    <JobsForms/>
                  
                  </div>
                  <MDBBtn className="mt-3" onClick={(ev) => {
                      ev.preventDefault()
                      formDataManager({type: actions.addNewJobsExperience})
                    }}> 
                      <i className="bi bi-plus-circle"></i> Agregar experiencia laboral
                  </MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <h2> Referencia Personal o Laboral </h2>
                  <div className="col-12 mb-2 row align-items-center flex-nowrap d-inline-flex w-100" style={{overflowX: 'scroll', minHeight: '200px'}}>
                    {userReferences.length > 0? userReferences.map((reference, index) => (
                      // eslint-disable-next-line react/jsx-key
                        <MDBCard key={`Reference-${index}`} className='mb-3 me-2 col-11 col-md-5' >
                          <MDBCardBody>
                            <MDBRow>
                              <MDBCol className='mb-3 col-12'>
                                <MDBInput label='Nombre y Apellido' type='text'
                                  value={reference.fullName}
                                  onChange={(e) => {changeSomeReference(reference, {fullName: e.target.value})}} />
                              </MDBCol>
                              <MDBCol className='mb-3 col-12'>
                                <MDBInput label='Teléfono' type='tel'
                                  value={reference.phoneNumber}
                                  onChange={(e) => {changeSomeReference(reference, {phoneNumber: e.target.value})}} />
                              </MDBCol>
                              <MDBCol className="col-12">
                                <MDBInput label='Correo' type='email'
                                  value={reference.email}
                                  onChange={(e) => {changeSomeReference(reference, {email: e.target.value})}} />
                              </MDBCol>
                              <MDBCol className="mx-auto mt-lg-0 col-6" lg="3">
                                <MDBBtn onClick={(ev) => {
                                    ev.preventDefault()
                                    formDataManager({type: actions.removeReference, reference})
                                  }} className="w-100 mt-2">
                                  <i className="icon bi-trash" ></i>
                                </MDBBtn>
                              </MDBCol>
                            </MDBRow>
                          </MDBCardBody>
                        </MDBCard>
                      )):
                        <MDBCard className="mb-2 px-3 py-5">
                          <div className="w-75 p3 text-center mx-auto text-dark">
                            <h3 className="fs-5">Agregue sus referencias aquí <i className="text-primary icon bi-telephone" ></i></h3>
                          </div>
                        </MDBCard>
                    }
                  </div>
                  
                <MDBBtn onClick={(ev) => {
                    ev.preventDefault()
                    formDataManager({type: actions.addNewReference})
                  }}> Agregar referencia <i className="bi bi-plus-circle"></i>
                </MDBBtn>

                
              </MDBCol>
            </MDBRow>

          </MDBCol>
      </div>
    </div>
    
      </MDBAccordionItem>
    </MDBAccordion>
}