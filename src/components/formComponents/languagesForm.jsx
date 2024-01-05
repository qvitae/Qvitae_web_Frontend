import React, {useEffect, useState} from "react";
import { MDBRow } from "mdb-react-ui-kit";
import {actions } from "../../context/CvFormProvider";
import { useFormData } from "../../hooks/useFormData";
import { Form } from "react-bootstrap";

function useFetchLanguages() {
    const languagesAvailable = [
      { id: 1, name: "Inglés" },
      { id: 2, name: "Chino Mandarín" },
      { id: 3, name: "Español" },
      { id: 4, name: "Francés" },
      { id: 5, name: "Alemán" },
      { id: 6, name: "Ruso" },
      { id: 7, name: "Árabe" },
      { id: 8, name: "Portugués" },
      { id: 9, name: "Hindi" },
      { id: 10, name: "Japonés" },
      { id: 11, name: "Italiano" },
      { id: 12, name: "Coreano" },
      { id: 13, name: "Hebreo" },
      { id: 14, name: "Turco" },
      { id: 15, name: "Persa (Farsi)" }
    ];
  
  
  
  
    const [languages, setLanguages] = useState([])
  
    useEffect(() => {
  
      setTimeout(() => {
        setLanguages(languagesAvailable)
      }, 5000)
  
  
    }, [])
    return languages
  }
  


export default function LanguagesForm({languages}) {

    const {formState, formDataManager} = useFormData(), 
        {userLanguages} = formState
        
        
    function updateLanguage(language, values) {
        formDataManager({type: actions.updateLanguage, language, values})
        }
    
    return <MDBRow className="w-100 p-3">
        <h2>Idiomas</h2>
        <div className="d-flex p-2 flex-wrap">
        <div className="px-2 pt-3 mb-3 w-100 d-flex" style={{overflowX: 'scroll'}}>
            {userLanguages.map((userLanguage, index) => 
            <div className="p-4 mb-2 border rounded mx-1 position-relative" style={{minWidth: '250px'}} key={index}>
                <Form.Select className="mb-2" onChange={(e) => {updateLanguage(userLanguage, {...userLanguage, languageId: Number(e.target.value)})}}>
                    <option > -- Selecciona un idioma -- </option>
                    {
                        languages?.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)
                    }
                </Form.Select>

                <Form.Select className="mb-2" onChange={(e) => {
                    updateLanguage(userLanguage, {...userLanguage, languageLevel: e.target.value})
                }}>
                    <option> -- Nivel de habilidad -- </option>
                    <option value="bajo"> Básico</option>
                    <option value="intermedio"> Medio</option>
                    <option value="profesionl"> Profesional</option>
                </Form.Select>
                {/* <span  > &times; </span> */}
                <i onClick={() => {
                    formDataManager({type:actions.removeLanguage, language: userLanguage})}} className="position-absolute end-0 top-0 close fw-bold icon bi-x-lg" style={{cursor:'pointer', fontSize: '1.2em'}} />
            </div>)
            }
        </div>

        <button className="btn btn-primary w-100" onClick={e => {
                e.preventDefault()
                formDataManager({type: actions.addNewLanguage})
            }
        }>
            Agregar idioma
        </button>
        </div>
    </MDBRow>
}