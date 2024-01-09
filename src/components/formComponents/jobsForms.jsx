import React from "react"
import { actions } from "../../context/CvFormProvider"
import { useFormData } from "../../hooks/useFormData"


import { MDBBtn, MDBCard, MDBTable, MDBInput, MDBTextArea, MDBRow, MDBCol, MDBCardBody, MDBSwitch } from "mdb-react-ui-kit"
import DatePicker from "../DatePicker"




export default function JobsForms() {

    const {formState, formDataManager} = useFormData(),
        {userJobsExperiences} = formState,

        changeSomeJobExpirience = (id, values) => 
            formDataManager({type: actions.setSomeJobsExperience, id, values})

    return userJobsExperiences?.length > 0? userJobsExperiences.map((experience, index) => (
        <MDBCard key={index} className='mb-3 p-0 col-10 col-md-5 mx-2' style={{flex: '1 1 1'}} >
            <MDBCardBody>
                {/* <MDBTable>   */}
                    <MDBInput className="mb-3" label='Posición' id='form1' type='text' 
                        value={experience?.position} onChange={(e) => changeSomeJobExpirience(
                            experience.id, {position: e.target.value}
                        )}
                    />
                    <MDBInput className="mb-3" label='Nombre de la Empresa' id='form1' type='text' 
                        value={experience?.companyName} onChange={(e) => changeSomeJobExpirience(
                            experience.id, {companyName: e.target.value}
                        )}
                    />
                    <MDBTextArea className="mb-3" style={{maxHeight: '200px'}} label='Descripción del Puesto' id='textAreaExample' rows={4} 
                        value={experience.positionDescription || ''}  onChange={(e) => changeSomeJobExpirience(
                            experience.id, {positionDescription: e.target.value}
                        )}
                    />
                    <MDBRow>
                        <MDBCol>
                            <DatePicker max={new Date().toISOString().split('T')[0]} label='Fecha de Inicio' 
                                value={experience.stardDate}  onChange={(e) => changeSomeJobExpirience(
                                    experience.id, {stardDate: e.target.value}
                                )}
                            />
                        </MDBCol>
                        <MDBCol>
                            {experience.endDate && <DatePicker max={new Date().toISOString().split('T')[0]} label='Fecha de Fin'
                                value={experience.endDate}  onChange={(e) => changeSomeJobExpirience(
                                    experience.id, {endDate: e.target.value}
                                )}
                            />}
                        </MDBCol>
                    </MDBRow>
                    
                    <MDBRow className='mx-4'>
                        <MDBCol className='mb-2'>
                        <MDBSwitch id='flexSwitchCheckDefault' label="Trabajando Actualmente" 
                            checked={!experience.endDate} 
                            onChange={(e) => {
                                let changedDate = e.target.checked 
                                    ? null
                                    : new Date().toISOString().split('T')[0]
                                changeSomeJobExpirience(experience.id, {endDate: changedDate})
                            }}
                        />
                        </MDBCol>
                    </MDBRow>
                    <MDBCol>
                        <MDBBtn onClick={e => {
                            e.preventDefault()
                            formDataManager({type: actions.removeJobsExperience, id: experience.id})
                        } } className='ms-2'>
                            <i className="bg-transparent text-white icon bi-trash" ></i>
                        </MDBBtn>
                    </MDBCol>
                
                {/* </MDBTable> */}
            </MDBCardBody>
        </MDBCard>
    )):
    <MDBCard className="w-100 d-flex justify-content-center align-items-center">
        <div className="p-3 text-center border rounded w-75">
            <h2 className="fs-5"> Agrega tus experiencias aquí <i className="bi bi-briefcase text-primary"></i> </h2>
        </div>
    </MDBCard>
}