import { useEffect, useState } from "react";


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