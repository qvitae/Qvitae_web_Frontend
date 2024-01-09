import React, {createContext, useEffect, useReducer, useRef} from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { customFetch } from "../helpers/fetchers";
import { useDefaultUserFormData } from "../hooks/useFetchFormData";
import v4 from "react-uuid";

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
    removeStudy: 'remove-study',

    setState: 'set-state'
}

let initialState = {
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


export const FormContext = createContext()





 
export default function CVFormContext({children}) {

    const debounceTimerRef = useRef(null),
        sendData = useRef(false)


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
    
                let hobbiesResult = state.hobbies.length >= 3 ? [...state.hobbies.filter((hob, index) => index != 0)] : [...state.hobbies]
                    hobbiesResult.push({hobbyId: action.hobbyId})
                    
                return {...state, hobbies: hobbiesResult}
    
            case actions.removeHobby:
                return {...state, hobbies: 
                    state.hobbies.filter(hobby => hobby.hobbyId != action.hobbyId)}
    
            case actions.addSoftSkill:
    
                let skillsResult = state.softSkills.length >= 3? [...state.softSkills.filter((s, index) => index != 0)]
                    : [...state.softSkills]
                    
                skillsResult.push({softSkillId: action.skillId})
    
                return {...state, softSkills: skillsResult}
    
            case actions.removeSoftSkill:
                return {...state, softSkills:
                    state.softSkills.filter(skill => skill.softSkillId != action.skillId)}
            
            case actions.addNewLanguage:
                return {...state, userLanguages: [...state.userLanguages, {id: v4()}]}
    
            case actions.updateLanguage:
                const updatedLanguages = state.userLanguages.map(lang => {
                    if (lang.id === action.id) {
                        console.log(action.id, lang.id)
                        return {...lang, ...action.values}
                    }
                    
                    return {...lang}
                })
                
                return {...state,
                    userLanguages: 
                        updatedLanguages
                }
            case actions.removeLanguage:
                const filteredLanguages = state.userLanguages.filter(lang => lang.id !== action.id)
                return {...state, userLanguages: filteredLanguages}
                    
            case actions.setCareer:
                return {...state, career: {...state.career, ...action.values}}
            
            case actions.addNewJobsExperience:
                return {...state, userJobsExperiences: [...state.userJobsExperiences, {id: v4()}]}
    
            case actions.setSomeJobsExperience:
                let updatedExperiences = state.userJobsExperiences.map((exp) => {
                    if (exp.id == action.id) 
                        return {...exp, ...action.values}
    
    
                    return exp
                })
                
                return {...state,
                    userJobsExperiences: updatedExperiences}
            
            case actions.removeJobsExperience:
                const filteredJobs = state.userJobsExperiences.filter(job => job.id != action.id)
                return {...state, userJobsExperiences: filteredJobs}
            
            case actions.addNewReference:
                return {...state, userReferences: [...state.userReferences, {id: v4()}]}
    
            case actions.setReference:
                const updatedReferences = state.userReferences.map(ref => {
                    if (ref.id == action.id) 
                        return {...ref, ...action.values}
    
                    return ref
                })
                return {...state, userReferences: updatedReferences}
    
            case actions.removeReference:
                const filteredRefs = state.userReferences.filter(ref => ref.id != action.id)
                return {...state, userReferences: filteredRefs}
    
            case actions.addStudy:
                return {...state, userStudies: [...state.userStudies, {eduactionGrade: action.eduactionGrade, id: v4()}]}
    
            case actions.setStudy:
                const updatedStudies = state.userStudies.map(study => {
                    if (study.id == action.id) {
                        return {...study, ...action.values}
                    }
                    return study
                })
                
                return {...state, userStudies: updatedStudies}
    
            case actions.removeStudy:
                const filteredStudies = state.userStudies.filter(study => study.id != action.id)
                return {...state, userStudies: filteredStudies}
    
            case actions.setState:
                return {...state, ...action.values}
                
            default: 
                throw new Error('Accion no válida: ' + action.type)
        }
    }

    const [form, dispatch] = useReducer(reducer, initialState)
    
    useDefaultUserFormData(initialState, dispatch)

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            let response = await customFetch(`${import.meta.env.VITE_BACKEND_URL}/api/add-curriculum?completeSave=true`, {method: 'POST'}, JSON.stringify(form))
            if (response.code == 200) {
                
                return console.log(response.message)
            }
        }catch (err) {
            console.log(err)
            
        }
    }       


    useEffect(() => {
        if (!sendData.current) return  
        const debounce = () => {
            clearTimeout(debounceTimerRef.current)


            debounceTimerRef.current = setTimeout(async () => {
                try {
                    let data = await customFetch(`${import.meta.env.VITE_BACKEND_URL}/api/add-curriculum`, {method: 'POST'}, JSON.stringify(form))
                    console.log(data)
                    if (data.code == 200) {
                        console.log(data.message)
                    }
                }catch (err) {
                    console.log(err)
                }
            }, 1000*3)
        }

        debounce()
    }, [form])


    return <FormContext.Provider value={{formState:form, formDataManager: dispatch}}>
        <form onSubmit={handleSubmit} onChange={() => {sendData.current = true}}>
            {children}
            <div className='d-flex mt-2 justify-content-end'>
                <MDBBtn onClick={handleSubmit} type='submit' className='w-100'>Enviar CV</MDBBtn>
            </div>
        </form>
    </FormContext.Provider>
    
}