import React, {createContext, useContext, useReducer} from "react";

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
    updateLanguage: ''
}

const initialState = {
    name: '',
    lastName: '',
    personalData: {
        handicapped: false,
        gender: 'm'
    },
    career: {
        career: "",
        academy: "",
        end_date: "",
        grade: undefined
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
            return {...state, personal_data: {...action.personalData}}

        case actions.setAddress:
            return {...state, address: {...action.address}}

        case actions.addHobby:
            return {...state, hobbies: [...state.hobbies, {hobbyId: action.hobbyId}]}

        case actions.removeHobby:
            return {...state, hobbies: state.hobbies.filter(hobby => hobby.hobbyId != action.hobbyId)}

        case actions.addSoftSkill:
            return {...state, softSkills: [...state.softSkills, {softSkillId: action.skillId}]}

        case actions.removeSoftSkill:
            return {...state, softSkills: state.softSkills.filter(skill => skill.softSkillId != action.skillId)}
        
        
        default: 
            throw new Error('Accion no válida: ' + action.type)
    }
}



export const FormContext = createContext()
export const useFormData = () => useContext(FormContext);


export default function CVFormContext({children}) {

    const [form, dispatch] = useReducer(reducer, initialState)

    function handleSubmit(event) {
        event.preventDefault()
    }
    
   

    return <FormContext.Provider value={{formState:form, formDataManager: dispatch}}>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    </FormContext.Provider>
    
}