import React, { useState, useEffect, useRef } from "react"
import { useFormData } from "../../context/CvFormProvider";
import { MDBRow, MDBCol, MDBInput,  } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { actions } from "../../context/CvFormProvider";

 // Datos de prueba
const provincesRD = [
    { name: "Azua", id: 1 },
    { name: "Bahoruco", id: 2 },
    { name: "Barahona", id: 3 },
    { name: "Dajabón", id: 4 },
    { name: "Distrito Nacional", id: 5 },
    { name: "Duarte", id: 6 },
    { name: "Elías Piña", id: 7 },
    { name: "El Seibo", id: 8 },
    { name: "Espaillat", id: 9 },
    { name: "Hato Mayor", id: 10 },
    { name: "Hermanas Mirabal", id: 11 },
    { name: "Independencia", id: 12 },
    { name: "La Altagracia", id: 13 },
    { name: "La Romana", id: 14 },
    { name: "La Vega", id: 15 },
    { name: "María Trinidad Sánchez", id: 16 },
    { name: "Monseñor Nouel", id: 17 },
    { name: "Monte Cristi", id: 18 },
    { name: "Monte Plata", id: 19 },
    { name: "Pedernales", id: 20 },
    { name: "Peravia", id: 21 },
    { name: "Puerto Plata", id: 22 },
    { name: "Samaná", id: 23 },
    { name: "San Cristóbal", id: 24 },
    { name: "San José de Ocoa", id: 25 },
    { name: "San Juan", id: 26 },
    { name: "San Pedro de Macorís", id: 27 },
    { name: "Sánchez Ramírez", id: 28 },
    { name: "Santiago", id: 29 },
    { name: "Santiago Rodríguez", id: 30 },
    { name: "Valverde", id: 31 },
    { name: "San Pedro de Macorís", id: 32 }
]


export function useFetchProvinces(defaultSetter) {
    const [provinces, setProvinces] = useState([]),
    [selectedCountry, setSelectedCountry] = useState(null),
    [isLoading, setLoadingState] = useState(true);
    
    useEffect(() => {    
        setProvinces([])
        setLoadingState(true)
        
        
        setTimeout(() => {
            setProvinces(provincesRD)
            setLoadingState(false)
        }, 5000)
    
        
        return defaultSetter()
    }, [selectedCountry])

    
    return {isLoading, setSelectedCountry, provinces}
}




export default function AddressForm() {

    const {formState, formDataManager} = useFormData(),
        {address:totalAddres} = formState,
        {address, secundaryAddress, suburb, provinceId} = totalAddres,

        changeAddress = (values) => 
            formDataManager({type: actions.setAddress, address: {...formState.address, ...values}}),
        
        provinceInputRef = useRef()

    const {provinces, setSelectedCountry, isLoading} = useFetchProvinces(() => changeAddress({provinceId: null}))  
        



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
            <Form.Select ref={provinceInputRef} onChange={(e)=> changeAddress({provinceId: e.target.value})} >
                <option>{isLoading? 'Cargando...' : 'Provincia'}</option>
                {provinces.map((province) => 
                <option key={province.id} value={province.id} defaultChecked={province.id === provinceId} > {province.name} </option>
                )}
                
            </Form.Select>
        </MDBCol> 
    </MDBRow>

    <MDBRow className='mb-5'>
        <MDBCol>
        <Form.Select  onChange={e => {
            setSelectedCountry(e.target.value)
        }}>
            <option value="5">	República Dominicana </option>
            <option value="6">	Santiago? </option>
        </Form.Select>
        </MDBCol>
    </MDBRow>
    </>
}