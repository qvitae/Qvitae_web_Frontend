import React from "react";
import { MDBAccordion, MDBRow, MDBCol, MDBCard, MDBBtn, MDBAccordionItem, MDBInput, MDBIcon } from "mdb-react-ui-kit";
import DataPicker from "../DataPicker";
import { actions } from "../../context/CvFormProvider";
import { useFormData } from "../../hooks/useFormData";
import StudyForm from "./StudyForm";


export default function EducationInfo() {

    const {formState, formDataManager} = useFormData(),
            {userStudies} = formState,
            grade = userStudies.filter(study => true)

    return (
        <MDBAccordion>
            <MDBAccordionItem collapseId={1} headerTitle={<><i className="icon bi-book-half text-primary" /> &nbsp; Educación</>}>
             
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <h2>Carrera de grado</h2>
                        <StudyForm  />
                    </MDBCol>
                </MDBRow>

                <MDBRow className='mb-4'>
                <MDBCol>
                    <h2>Posgrado/Maestría</h2>
                    <StudyForm gradeLevel="postgraduate" gradeIcon={<i className="icon bi-award"></i>} />
                </MDBCol>
                </MDBRow>

                <MDBRow>
                <MDBCol>
                    <h2>Formación complementaria</h2>
                    <StudyForm gradeLevel="additionalStudy" gradeIcon={<i className="icon bi-lightbulb"></i>} />
                </MDBCol>
                </MDBRow>
            </MDBAccordionItem>
        </MDBAccordion>
    )
}
