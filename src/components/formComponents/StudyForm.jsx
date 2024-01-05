import React from "react"
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from "mdb-react-ui-kit"
import DataPicker from "../DataPicker"
import {actions } from "../../context/CvFormProvider"
import { useFormData } from "../../hooks/useFormData"

export default function StudyForm({gradeLevel = "superiorEducation", gradeIcon = (<i className="icon bi-mortarboard"></i>)}) {
    const {formState, formDataManager} = useFormData(),
            {userStudies} = formState,
            studies = userStudies.filter(study => study.grade == gradeLevel),

            changeSomeStudy = (study, values) => {
                formDataManager({type: actions.setStudy, study, values})
            }

    return (
        <>
            <div className="d-inline-flex w-100 align-items-center flex-nowrap row overflow-x-scroll" style={{minHeight: '200px'}}>
                {studies.length > 0? studies.map((study, index) => (
                        <div key={`${gradeLevel}-${index}`} className="col-12 col-lg-4">
                            <MDBCard className='mb-3'>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol lg="4" className='mb-3'>
                                            <MDBInput label='Profesión' id='form1' type='text' 
                                            value={study.career}
                                            onChange={(e) => {changeSomeStudy(study, {career: e.target.value})}}
                                            />
                                        </MDBCol>
                                        <MDBCol lg="4" className='mb-3'>
                                            <MDBInput label='Academia' id='form1' type='text' 
                                            value={study.academy}
                                            onChange={(e) => {changeSomeStudy(study, {academy: e.target.value})}}
                                            />
                                        </MDBCol>
                                        <MDBCol lg="4" className='mb-3'>
                                            <DataPicker 
                                            value={study.endDate} 
                                            onChange={(e) => {changeSomeStudy(study, {endDate: e.target.value})}}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBBtn onClick={() => formDataManager({type:actions.removeStudy, study})}> <i className="icon bi-trash"></i> </MDBBtn>
                                </MDBCardBody> 
                            </MDBCard>
                        </div>
                    ))
                    :
                    <MDBCard className="mx-auto w-75 p-3 col-12">
                        {/* <h3 className="fs-5 text-center">Agregue sus estudios aquí</h3> */}
                        <h3 className="fs-3 text-center text-primary" >{gradeIcon}</h3>
                    </MDBCard>
                }
            </div>
            <MDBBtn className="mt-2" onClick={(ev) => {
                ev.preventDefault()
                formDataManager({type: actions.addStudy, grade: gradeLevel})
            }}>Agregar Carrera</MDBBtn>
        </>)
}