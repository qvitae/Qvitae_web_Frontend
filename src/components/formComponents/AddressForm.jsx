import React, { useState, useEffect, useRef } from "react"
import { MDBRow, MDBCol, MDBInput,  } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { actions } from "../../context/CvFormProvider";
import { useFormData } from "../../hooks/useFormData";


export function useFetchProvinces(defaultSetter) {
    const [provinces, setProvinces] = useState([]),
    [selectedCountry, setSelectedCountry] = useState(null),
    [isLoading, setLoadingState] = useState(true);
    
    useEffect(() => {    
        if (Number.isNaN(Number(selectedCountry))) return
        
        setProvinces([])
        setLoadingState(true)
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-provinces/${selectedCountry}`)
        .then(response => response.json())
        .then(json => {
            if (json.code == 200) return setProvinces(json.data)
        })
        .catch(err => console.log(err))
        .finally(() => {setLoadingState(false)})
    
        
        return defaultSetter
    }, [selectedCountry])

    
    return {isLoading, setSelectedCountry, provinces}
}




export default function AddressForm({countries=[]}) {

    const {formState, formDataManager} = useFormData(),
        {address:totalAddres} = formState,
        {address, secundaryAddress, suburb, provinceId} = totalAddres,

        changeAddress = (values) => 
            formDataManager({type: actions.setAddress, address: {...formState.address, ...values}}),
        
        provinceInputRef = useRef()

    const {provinces, setSelectedCountry, isLoading} = useFetchProvinces(() => {
        let input = provinceInputRef.current

        input?.classList?.add('border-danger')
    })  
        



    return <>
    <MDBRow className='mb-5'>
        <MDBCol>
            <MDBInput label='Dirección' id='typeText' type='text' 
            value={address || ''} onChange={(e) => changeAddress({address: e.target.value})}
            />
        </MDBCol>
    </MDBRow>

    <MDBRow className='mb-5'>
        <MDBCol>
            <MDBInput label='Dirección secundario' id='typeText' type='text' 
            value={secundaryAddress || ''} onChange={(e) => changeAddress({secundaryAddress: e.target.value})}
            />
        </MDBCol>
    </MDBRow>

    <MDBRow className='mb-5'>
        <MDBCol>
        <MDBInput label='Sector' id='typeText' type='text' 
            value={suburb || ''} onChange={(e) => changeAddress({suburb: e.target.value})}
        />
        </MDBCol>
        <MDBCol>
            <Form.Select ref={provinceInputRef} className={!provinceId && 'border-danger'} value={provinceId || ''} onChange={(e)=> changeAddress({provinceId: Number(e.target.value) > 1? e.target.value : null})} >
                <option>{isLoading? 'Cargando...' : 'Provincia'}</option>
                {provinces?.map((province) => 
                    <option key={province.id} value={province.id} > {province.name} </option>
                )}
                
            </Form.Select>
        </MDBCol> 
    </MDBRow>

    <MDBRow className='mb-5'>
        <MDBCol>
        <Form.Select  onChange={e => {
            setSelectedCountry(e.target.value)
        }}>
            <option> -- Ciudad -- </option>
            {
                countries.map(country => <option key={country.id} value={country.id} >{country.name}</option>)
            }
        </Form.Select>
        </MDBCol>
    </MDBRow>
    </>
}