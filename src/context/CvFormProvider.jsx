import React, {createContext, useReducer} from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { customFetch } from "../helpers/fetchers";

export const actions = {
    setName: 'set-name',
    setLastName: 'set-LastName',
    setAddress: 'set-address',
    setPersonalData:  'set-personal-data',
    addHobby: 'add-hobby',
    removeHobby: 'remove-hobby',
    addSoftSkill: 'add-soft-skill',
    removeSoftSkill: 'remove-soft-skill',

    addNewLanguage: 'add-language',
    updateLanguage: 'update-language',
    removeLanguage: 'remove-language',

    setCareer: 'set-career',

    addNewJobsExperience: 'add-new-experience',
    setSomeJobsExperience: 'set-job-experience',
    removeJobsExperience: 'remove-job-experience',

    addNewReference: 'add-new-reference',
    setReference: 'set-reference',
    removeReference: 'remove-reference',

    addStudy: 'add-study',
    setStudy: 'set-study',
    removeStudy: 'remove-study'
}

const initialState = {
    name: '',
    lastName: '',
    personalData: {
        handicapped: false,
        gender: 'm'
    },
    career: {
        name: "",
        experience: 0,
    },
    address: {
        address: "",
        suburb: "",
        provinceId: null
    },
    hobbies: [],
    softSkills: [],
    userLanguages: [

    ],
    userJobsExperiences: [

    ],
    userReferences: [

    ],
    userStudies: [

    ]
}

function reducer(state, action) {
    switch (action.type) {
        case actions.setName:
            return {...state, name: action.value}

        case actions.setLastName:
            return {...state, lastName: action.value}

        case actions.setPersonalData:
            return {...state, personalData: {...action.personalData}}

        case actions.setAddress:
            return {...state, address: {...action.address}}

        case actions.addHobby:
            if (state.hobbies.find(hob => hob.hobbyId == action.hobbyId)) return state

            let hobbiesResult = state.hobbies.length === 3 ? [...state.hobbies.filter((hob, index) => index != 0)] : [...state.hobbies]
                hobbiesResult.push({hobbyId: action.hobbyId})
                
            return {...state, hobbies: hobbiesResult}

        case actions.removeHobby:
            return {...state, hobbies: 
                state.hobbies.filter(hobby => hobby.hobbyId != action.hobbyId)}

        case actions.addSoftSkill:

            let skillsResult = state.softSkills.length === 3? [...state.softSkills.filter((s, index) => index != 0)]
                : [...state.softSkills]
                
            skillsResult.push({softSkillId: action.skillId})

            return {...state, softSkills: skillsResult}

        case actions.removeSoftSkill:
            return {...state, softSkills:
                state.softSkills.filter(skill => skill.softSkillId != action.skillId)}
        
        case actions.addNewLanguage:
            return {...state, userLanguages: [...state.userLanguages, {}]}

        case actions.updateLanguage:
            let selectedLanguage = {...action.language, ...action.values}
            
            return {...state,
                userLanguages: 
                    [...state.userLanguages.filter((lang) => lang != action.language), selectedLanguage]
            }
        case actions.removeLanguage:
            return {...state, userLanguages: state.userLanguages.filter(lang => lang !== action.language)}
                
        case actions.setCareer:
            return {...state, career: {...state.career, ...action.values}}
        
        case actions.addNewJobsExperience:
            return {...state, userJobsExperiences: [...state.userJobsExperiences, {}]}

        case actions.setSomeJobsExperience:
            let selectedJobExperience = {...action.jobExperience, ...action.values}
            
            return {...state,
                userJobsExperiences: 
                    [...state.userJobsExperiences.filter((exp) => exp != action.jobExperience), selectedJobExperience]}
        
        case actions.removeJobsExperience:
            return {...state, userJobsExperiences: state.userJobsExperiences.filter(userJob => userJob !== action.userJob)}
        
        case actions.addNewReference:
            return {...state, userReferences: [...state.userReferences, {}]}

        case actions.setReference:
            return {...state, userReferences: 
                [...state.userReferences.filter(ref => ref != action.reference), action.selectedReference]}

        case actions.removeReference:
            return {...state, userReferences: state.userReferences.filter(ref => ref != action.reference)}

        case actions.addStudy:
            return {...state, userStudies: [...state.userStudies, {grade: action.grade}]}

        case actions.setStudy:
            return {...state, userStudies: 
                [...state.userStudies.filter(study => study != action.study), {...action.study, ...action.values}]}

        case actions.removeStudy:
            return {...state, userStudies: state.userStudies.filter(study => study != action.study)}
            
        default: 
            throw new Error('Accion no válida: ' + action.type)
    }
}
export const FormContext = createContext()



 
export default function CVFormContext({children}) {

    const [form, dispatch] = useReducer(reducer, initialState)

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            let response = await customFetch(`${import.meta.env.VITE_BACKEND_URL}/api/add-curriculum`, {method: 'POST'}, JSON.stringify(form))
            if (response.code == 200) {
                
                return console.log(response.message)
            }
        }catch (err) {
            console.log(err)
            
        }
    }       
   

    return <FormContext.Provider value={{formState:form, formDataManager: dispatch}}>
        <form onSubmit={handleSubmit}>
            {children}
            <div className='d-flex mt-2 justify-content-end'>
                <MDBBtn onClick={handleSubmit} type='submit' className='w-100'>Enviar CV</MDBBtn>
            </div>
        </form>
    </FormContext.Provider>
    
}