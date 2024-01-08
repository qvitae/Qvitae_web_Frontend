import React from "react"
import { actions } from "../../context/CvFormProvider"
import { useFormData } from "../../hooks/useFormData"


import { MDBBtn, MDBCard, MDBTable, MDBInput, MDBTextArea, MDBRow, MDBCol, MDBCardBody, MDBSwitch } from "mdb-react-ui-kit"
import DataPicker from "../DataPicker"




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
                            index, {position: e.target.value}
                        )}
                    />
                    <MDBInput className="mb-3" label='Nombre de la Empresa' id='form1' type='text' 
                        value={experience?.companyName} onChange={(e) => changeSomeJobExpirience(
                            index, {companyName: e.target.value}
                        )}
                    />
                    <MDBTextArea className="mb-3" style={{maxHeight: '200px'}} label='Descripción del Puesto' id='textAreaExample' rows={4} 
                        value={experience.positionDescription}  onChange={(e) => changeSomeJobExpirience(
                            index, {positionDescription: e.target.value}
                        )}
                    />
                    <MDBRow>
                        <MDBCol>
                            <DataPicker max={new Date().toISOString().split('T')[0]} label='Fecha de Inicio' 
                                value={experience.stardDate}  onChange={(e) => changeSomeJobExpirience(
                                    index, {stardDate: e.target.value}
                                )}
                            />
                        </MDBCol>
                        <MDBCol>
                            {experience.endDate && <DataPicker max={new Date().toISOString().split('T')[0]} label='Fecha de Fin'
                                value={experience.endDate}  onChange={(e) => changeSomeJobExpirience(
                                    index, {endDate: e.target.value}
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
                                changeSomeJobExpirience(index, {endDate: changedDate})
                            }}
                        />
                        </MDBCol>
                    </MDBRow>
                    <MDBCol>
                        <MDBBtn onClick={e => {
                            e.preventDefault()
                            formDataManager({type: actions.removeJobsExperience, userJob: experience})
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