import React, {createContext, useContext, useReducer} from "react";

export const actions = {
    setName: 'set-name',
    setLastName: 'set-LastName',
    setAddress: 'set-address'
}

export const FormContext = createContext()

export const useFormData = () => useContext(FormContext);

function reducer(state, action) {
    switch (action.type) {
        case actions.setName:
            
            break;    
        case actions.setLastName:
                
            break;
        case actions.setAddress:
        
            break;
        default: 
            throw new Error('Accion no válida: ' + action.type)
    }
}

export default function CVFormContext({children}) {

    const [form, dispatch] = useReducer(reducer, {})

    function handleSubmit(event) {
        event.preventDefault()
    }
    
   

    return <FormContext.Provider value={{formState, formDataManager: dispatch}}>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    </FormContext.Provider>
    
}