import { useEffect, useState } from "react";
import { customFetch } from "../helpers/fetchers";
import v4 from "react-uuid";


// Function to map the data in case the data structure change on the future
function mappedFormData(data) {

    const {hobbies, countries, languages, softSkills, careers} = data.data

    return {hobbies, countries, languages, softSkills, careers}
}


// Custom hook to load the required data from cv register form
export default function useFetchFormData() {

    const [countries, setCountries] = useState([]),
        [softSkills, setSkills] = useState([]),
        [hobbies, setHobbies] = useState([]),
        [languages, setLanguages] = useState([]),
        [careers, setCareers] = useState([]),
        [isLoading, setLoadingState] = useState(true)

    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-form-default-data`, {
            headers: {
                "Content-Type":"application/json",
                "authentication": `bearer ${''}`
            }
        })
        .then(response => {            
            if (response.status == 200) return response.json()

            throw new Error('Ha ocurrido algo inesperado')
        })
        .then(data => {
            const {hobbies, countries, languages, softSkills, careers} = mappedFormData(data)

            setCountries(countries)
            setHobbies(hobbies)
            setLanguages(languages)
            setSkills(softSkills)
            setCareers(careers)

        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => setLoadingState(false))


    }, [])

    return {countries, softSkills, hobbies, languages, careers, isLoading}
}

export function useDefaultUserFormData(initialState, dispatch) {
    useEffect(() => {
        async function loadData() {
            const data = await customFetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`)
            const {name, lastName, curriculum} = data
    
            initialState.name = name
            initialState.lastName = lastName
        
            if (curriculum) {
                initialState.personalData = {
                    handicapped: Boolean(curriculum.handicapped),
                    gender: curriculum.gender || 'm',
                    alternativeEmail: curriculum.alternativeEmail,
                    identificationId: curriculum.identificationId,
                    birthDate: curriculum.birthDate || new Date(),
                    phoneNumber: curriculum.phoneNumber,
                    personalDescription: curriculum.personalDescription || ''
                }
                
                const userAddress = curriculum.address
                
                Object.entries(userAddress).forEach(([key, value]) => initialState.address[key] = value)
                
                const {userCareer} = curriculum
                
                initialState.career = {
                    experience: userCareer.experience || 0,
                    name: userCareer?.career?.name || ''
                }
                
                initialState.hobbies = curriculum.hobbies?.map(userHob => ({hobbyId: userHob.userHobby.hobbyId})) || []
                
                initialState.softSkills = curriculum.softSkills?.map(skill => ({softSkillId: skill.userSkill.softSkillId})) || []
                
                initialState.userJobsExperiences = curriculum.userJobsExperiences?.map(job => job) || []

                initialState.userLanguages = curriculum.languages?.map(lang => ({id: v4(), ...lang.UserLanguage})) || []

                initialState.userReferences = curriculum.userReferences?.map(ref => ref) || []

                initialState.userStudies = curriculum.userStudies?.map(study => study) || []
                
                
                console.log(initialState)
            }
            dispatch({type: 'set-state', values: initialState})
        }
        loadData()
    },[])
    return initialState
}