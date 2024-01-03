import React, { useState } from "react"
import { MDBAccordion, MDBAccordionItem, MDBIcon, MDBRow, MDBCol, MDBInput, MDBSwitch,MDBTextArea,MDBTable, MDBCard, MDBCardBody, MDBBtn, MDBRadio } from 'mdb-react-ui-kit';
import { actions, useFormData } from "../../context/CvFormProvider";

import { Form } from "react-bootstrap";

const softSkills = [
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
];

function fetchLanguagues() {
  const [languages, setLanguages] = useState([])


}


export default function ExperienceInfo() {

    const {formState, formDataManager} = useFormData(),
          {userJobsExperiences, softSkills:userSkills, userLanguages} = formState





    return <MDBAccordion>
    <MDBAccordionItem collapseId={1} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Experiencia laboral</>}>
    

    <div className='row pt-3 '>

      <div className='col-md-4 empujando-abajo'>
          <MDBCol>

            <MDBRow>

              <MDBCol>
                <div className='fs-5'>Habilidades Blandas</div>
                <br />
                
                  {softSkills.map(skill => (
                    <div key={skill.id}>
                      <MDBSwitch 
                        
                        id={`flexSwitchCheckDefault${skill.id}`} 
                        label={skill.name} 
                        checked={userSkills.find(userSkill => userSkill.id == skill.id)} // Asegúrate de que el estado del switch refleje el valor actual de la habilidad
                        onChange={e => e.target.checked? 
                          formDataManager({type: actions.addSoftSkill, skillId: skill.id}) 
                          : 
                          formDataManager({type: actions.removeSoftSkill, skillId: skill.id})} 
                      />
                      <br />
                    </div>
                  ))}
               
                <br />
                <h2>Idiomas</h2>
                {userLanguages.map((userLanguage, index) => 
                <div className="p-3" key={index}>
                  <h3>Manejo del idioma </h3>
                  <Form.Select>
                    <option value="bajo"> Básico</option>
                    <option value="intermedio"> Medio</option>
                    <option value="profesionl"> Profesional</option>
                  </Form.Select>
                  <MDBInput label='Otro Idioma' placeholder='Ej) Alemán, Italiano, Francés' id='form1' type='text' 
                    // value={otherLanguage} onChange={(e) => setOtherLanguage(e.target.value)}
                  />
                </div>)
                }
                <button className="btn btn-primary" onClick={e => {
                  e.preventDefault()
                }}>
                  Agregar idioma
                </button>
              </MDBCol>
              
            </MDBRow>
          </MDBCol>
      </div>

      <div className='col-md-8'>
          <MDBCol>

            <MDBRow className='mb-5'>
              <MDBCol lg="4" className='mb-3'>
                <Form.Select onChange={() => {}}>
                  <option>Profesión</option>
                  <option value="1">  Ingenieria en Sistemas </option>
                  <option value="2">	Tecnólogo en Software  </option>
                  <option value="3">	Tecnólogo en Redes </option>
                  <option value="4">	Tecnólogo en Seguridad Informática </option>
                  <option value="5">	DISTRITO NACIONAL </option>
                  <option value="6">	Administrador de Bases de Datos </option>
                  <option value="7">	Arquitecto </option>
                  <option value="8">	Ingeniero Eléctrico, Electromecánico, Robótica </option>
                  <option value="9">	Ingeniero Civil </option>
                  <option value="10">	Ingeniero Industrial </option>
                  <option value="11">	Medicina </option>
                  <option value="12">	Bío-Analista </option>
                  <option value="13">	Enfermería </option>
                  <option value="14">	Contabilidad Finanzas </option>
                  <option value="15">	Administrador de Empresas </option>
                  <option value="16">	Relaciones Internacionales </option>
                  <option value="17">	Hotelería y Turismo </option>
                  <option value="18">	Mercadeo </option>
                  <option value="19">	Maestro </option>
                  <option value="20">	Psicología </option>
                  <option value="21">	Abogado </option>
                  <option value="22">	Asistente </option>
                  <option value="23">	Secretaria </option>
                  <option value="24">	Chofer </option>
                  <option value="25">	Otro </option>
                </Form.Select>
              </MDBCol>

              <MDBCol lg="4">
                <MDBInput label='Años de Experiencia' id='typeNumber' type='number' 
                //   value={yearExperience} onChange={(e) => setYearExperience(e.target.value)}
                />
              </MDBCol>

            </MDBRow>

            <MDBRow className='mb-4'>
              <MDBCol>
                <MDBTextArea label='Objetivos' id='textAreaExample' rows={4} 
                //   value={objectives} onChange={(e) => setObjectives(e.target.value)}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow className='mb-4'>
              <MDBCol>
                <div className='fs-5'>
                  Trabajos Recientes
                </div>
                <br />
                <div>
                  {userJobsExperiences.map((experience) => (
                    <MDBCard key={experience.id} className='mb-3'>
                    <MDBCardBody>
                      <MDBTable>  
                        <MDBInput label='Posición' id='form1' type='text' 
                          value={experience.position} onChange={(e) => handleExperience(experience.id, 'work_position', e.target.value)}
                        />
                        <br />
                        <MDBInput label='Nombre de la Empresa' id='form1' type='text' 
                          value={experience.companyName} onChange={(e) => handleExperience(experience.id, 'work_company_name', e.target.value)}
                        />
                        <br />
                        <MDBTextArea label='Descripción del Puesto' id='textAreaExample' rows={4} 
                          value={experience.description} onChange={(e) => handleExperience(experience.id, 'work_description', e.target.value)}
                        />
                        <br />
                        <MDBRow>
                          <MDBCol>
                            <DataPicker label='Fecha de Inicio' 
                              value={experience.stardDate} onChange={(e) => handleExperience(experience.id, 'work_start_date', e.target.value)}
                            />
                          </MDBCol>
                          <MDBCol>
                            <DataPicker label='Fecha de Fin'
                              value={experience.endDate} onChange={(e) => handleExperience(experience.id, 'work_end_date', e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        
                        <MDBRow className='mx-4'>
                          <MDBCol className='mb-2'>
                            <MDBSwitch id='flexSwitchCheckDefault' label="Trabajando Actualmente" 
                              checked={experience.currentlyWorking === "1"} 
                              onChange={(e) => handleExperience(experience.id, 'currentlyWorking', e.target.checked)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBCol>
                          <MDBBtn onClick={() => removeCard(experience.id)} className='ms-2'>x</MDBBtn>
                        </MDBCol>
                        
                        
                      </MDBTable>
                    </MDBCardBody>
                  </MDBCard>
                  ))}

                  <MDBBtn onClick={() => {}}>Agregar Experiencia</MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol>
                <div className='fs-5'>
                  Referencia Personal o Laboral
                </div>
                <br />
             
               
                  {userJobsExperiences.map((reference, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div key={index}>
                      <MDBCard className='mb-3' >
                        <MDBCardBody>

                          <MDBRow>
                            <MDBCol lg="4" className='mb-3'>
                              <MDBInput label='Nombre y Apellido' id={`form1-fullname-${index}`} type='text'
                                value={reference.fullname}
                                onChange={(e) => handleReference(index, 'nombre_completo_ref', e.target.value)} />
                            </MDBCol>
                            <br />
                            <MDBCol lg="4" className='mb-3'>
                              <MDBInput label='Teléfono' id={`form1-phone-${index}`} type='tel'
                                value={reference.phone}
                                onChange={(e) => handleReference(index, 'telefono_ref', e.target.value)} />
                            </MDBCol>
                            <br />
                            <MDBCol>
                              <MDBInput label='Correo' id={`form1-email-${index}`} type='email'
                                value={reference.email}
                                onChange={(e) => handleReference(index, 'correo_ref', e.target.value)} />
                            </MDBCol>
                          </MDBRow>

                        </MDBCardBody>
                        </MDBCard>
                      
                    </div>
                ))}
               
                 
              </MDBCol>
            </MDBRow>

          </MDBCol>
      </div>
    </div>
    </MDBAccordionItem>
  </MDBAccordion>
}