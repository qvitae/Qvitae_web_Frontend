/* eslint-disable no-undef */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBAccordion, MDBAccordionItem, MDBIcon, MDBRow, MDBCol, MDBFile, MDBInput, MDBSwitch,MDBTextArea,MDBTable, MDBCard, MDBCardBody, MDBBtn, MDBRadio } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

import DataPicker from '../components/DataPicker';

import useAuth from "../hooks/useAuth"




export default function CurriculumVitae() {

  const { closeSesion } = useAuth();

  const navigate = useNavigate()
  
  const [avatar, setAvatar] = useState(null);

  const token = localStorage.getItem('qv_token') 

  const uploadAvatar = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const urlImage = URL.createObjectURL(file); 
      setAvatar(urlImage);
    }
    
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    const url = `${import.meta.env.VITE_BACKEND_URL}/jsonapi/user/user/${id}/user_picture`; 
    try {
        const response = await axios.post(url, file, {
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/octet-stream',
                'X-CSRF-Token': token,
                'Content-Disposition': `file; filename="${file.name}"`,
                'Accept': 'application/vnd.api+json'
            }
        });

      await localStorage.setItem('img_fid', response.data.data.attributes.drupal_internal__fid);

    } catch (error) {
        console.error(error);
    }
  };


  const [name, setName] = useState('');
  const [lastName, setLastname] = useState(''); 
  const [birth, setBirth] = useState('')
  const [idCard, setIdCard] = useState('')
  const [cell, setCell] = useState('')
  const [alternativeMail, setAlternativeMail] = useState('')
  const [address, setAddress ] = useState('')
  const [sector, setSector] = useState('')
  

  const [province, setProvince] = useState('');
  const handleProvinceChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;

    setProvince(selectedText)
  }
  
  const [country, setCountry] = useState('')
  const handleCountryChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    setCountry(selectedText)

  }

  const [hobbies, setHobbies] = useState([
    { name: 'Correr', value: false },
    { name: 'Nadar', value: false },
    { name: 'Gimnasio', value: false },
    { name: 'Leer', value: false },
    { name: 'Cantar', value: false },
    { name: 'Teatro', value: false },
    { name: 'Equitación', value: false },
    { name: 'Cocinar', value: false },
    { name: 'Ver TV', value: false },
    { name: 'Ir al Cine', value: false },
    { name: 'Ir de Compras', value: false },
    { name: 'Tocar Instrumento', value: false }
    
  ]);

  const handleHobbiesChange = (hobbyName) => {
    setHobbies(hobbies.map(hobby => 
      hobby.name === hobbyName ? { ...hobby, value: !hobby.value  } : hobby
    ));
  };

  const hobbiesToSend = hobbies .filter(hobby => hobby.value)  .map(hobby => hobby.name);
  const firstHalfHobbies = hobbies.slice(0, hobbies.length / 2);
  const secondHalfHobbies = hobbies.slice(hobbies.length / 2);

  const [gender, setGender] = useState('')

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const [disability, setDisability] = useState('No')

  const handleDisability = () => {
    setDisability(prevState => prevState === 'No' ? 'Sí' : 'No');
  };
 
  const [softSkills, setSoftSkills] = useState([
    { name: 'Inteligencia Emocional', value: false },
    { name: 'Nivel de Urgencia', value: false },
    { name: 'Solución de Problemas', value: false },
    { name: 'Trabajo en Equipo', value: false },
    { name: 'Pensamiento Critico', value: false },
    { name: 'Etica Laboral', value: false },
    { name: 'Manejo de Tiempo', value: false },
    { name: 'Comunicación Efectiva', value: false },
    { name: 'Creatividad', value: false },
    { name: 'Capacidad de Negociación', value: false },
    { name: 'Capacidad Adaptación', value: false },
    { name: 'Liderazgo', value: '' }
  ])


  const handleSoftSkillsChange = (softSkillName) => {
    setSoftSkills(softSkills.map(skill => 
      skill.name === softSkillName ? { ...skill, value: !skill.value } : skill
    ));
  };

  const skillsToSend = softSkills .filter(skill => skill.value)  .map(skill => skill.name);
  
  const [englishLevel, setEnglishLevel] = useState('')

  const handleEnglishLevel = (event) => {
    setEnglishLevel(event.target.value);
  };

  const [otherLanguage, setOtherLanguage] = useState('');

  
  const [profesion, setProfesion] = useState('') 

   
   const handleProfesionChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    const selectedValue = event.target.value; 
    
    setProfesion(selectedText)
    
    if (selectedValue === '25') { 
      const otherProfesion = window.prompt('Ingrese su profesión:');
      
      if(otherProfesion){
        setProfesion(otherProfesion)
      } 

    }else {
      setProfesion(selectedText)
    }
   
  };
  
  const [yearExperience, setYearExperience] = useState(0)
  const [objectives, setObjectives] = useState('')
  const [references, setReferences] = useState([
    { nombre_completo_ref: '', telefono_ref: '', correo_ref: '' },
    { nombre_completo_ref: '', telefono_ref: '', correo_ref: '' }
  ]);

  const handleReference = (index, key, value) => {
    const newReferences = references.map((ref, refIndex) =>
      refIndex === index ? { ...ref, [key]: value } : ref
    );
    setReferences(newReferences);
  };

// ================================================================================
  const [experiences, setExperiences] = useState([{}]);
  const [grados, setGrados] = useState([{}]);
  const [postgrados, setPostgrados] = useState([{}]);
  const [additionalStudies, setAdditionalStudies] = useState([{}])


  const addCard = () => {
    const newCard = {
      id: Number  
    };

    setExperiences((prevCards) => [...prevCards, newCard]);
  };

  const removeCard = (id) => {
    setExperiences((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleExperience = (id, key, value) => {

    const newValue = key === 'currentlyWorking' ? (value ? "1" : "0") : value;

    setExperiences(prevExperiences => prevExperiences.map(experience =>
      experience.id === id ? { ...experience, [key]: newValue } : experience
    ));
  };  

  
  const addGrado = () => {
    const newCard = {
      id: Date.now(),
      
    };

    setGrados((prevCards) => [...prevCards, newCard]);
  };

  const removeGrado = (id) => {
    setGrados((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleGrado = (id, key, value) => {
    setGrados(prevGrados => prevGrados.map(grado =>
      grado.id === id ? { ...grado, [key]: value } : grado
    ));
  };

   
   const addPostgrado = () => {
    const newCard = {
      id: Date.now()
    };

    setPostgrados((prevCards) => [...prevCards, newCard]);
  };

  const removePostgrado = (id) => {
    setPostgrados((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handlePostGrado = (id, key, value) => {
    setPostgrados(prevPosGrados => prevPosGrados.map(postGrado =>
      postGrado.id === id ? { ...postGrado, [key]: value } : postGrado
    ));
  };

  
  const addAdditionalStudies = () => {
    const newCard = {
      id: Date.now()
    };

    setAdditionalStudies((prevCards) => [...prevCards, newCard]);
  };

  const removeAdditionalStudies = (id) => {
    setAdditionalStudies((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleAddStudies = (id, key, value) => {
    setAdditionalStudies(prevAddStudies => prevAddStudies.map(addStudy =>
      addStudy.id === id ? { ...addStudy, [key]: value } : addStudy
    ));
  };


// Function to save cv form
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('qv_token')
    const imgId = localStorage.getItem('img_fid')
    const username = localStorage.getItem('username')
    
      const headers = { 
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': token
          
      }

    try {
       
      const url = `${import.meta.env.VITE_BACKEND_URL}/webform_rest/submit?_format=json`
      const response = await axios.post(url, {
        "logged_user_uuid": id,
        "logged_username": username,
        "profile_picture" : imgId,
        "webform_id": "qvitae_cv_data", 
         "full_name": name,
         "last_name": lastName,
         "birthday": birth,
         "document_id": idCard,
         "gender": gender, // Masculino / Femenino
         "work_objetive": objectives,
         "habilidades_blandas": skillsToSend,
         "years_of_experience": yearExperience, // solo numeros
         "email": alternativeMail,
         "address": {
             "address": address,
             "address_2": "Apt 4B",
             "postal_code": "12345",
             "city": sector,
             "country": country,
             "state_province": province
         },
         "english_level_option": englishLevel,
         "hobbies": hobbiesToSend,
         "profesional_area": profesion,
         "profesional_area_other": profesion,
         "phone_number": cell,
         "other_language": otherLanguage,
         "disability": disability, // Si / No
         "recent_work_history": experiences,
         "grade_career": grados,
         "post_grade": postgrados,
         "complementary_formation": additionalStudies,
         "work_personal_reference": references
     }, headers)

      alert("Los datos fueron guardados con exito")

      navigate('/user') 

    } catch (error) {
      console.log(error)
    }
  }
 

  return (
    <>
        <main className='container mx-auto'>

        <div className="container mx-auto d-flex flex-lg-row justify-content-between align-items-center mb-5 ">
          <img src="/images/QVITAE-LOGO.png" alt="Logo" className="img-logo-user"/>

          <nav className="d-flex flex-column mt-5 flex-lg-row align-items-center gap-4">
            <Link to={'/user'}
              className="color-rosa fs-5 text-decoration-none"
            >
            Ir al Perfil
            </Link>
            <button type="button"  
              className="custom-button-close"
              onClick={closeSesion}
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
          
        <form onSubmit={handleSubmit}> 
          <MDBAccordion>
            <MDBAccordionItem collapseId={1} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Información personal 
            </>}>
           
            <div className='row pt-3'>
              <div className='col-md-3 empujando-abajo'>
                     {avatar ? (
                         <img src={avatar} className='img-fluid rounded' alt='' />
                     ) : (
                        <div className='border rounded p-3 text-center' style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                          Foto de Perfil
                        </div>
                     )}
                    <div className='mt-2'>
                      {avatar ? (
                        <div className='md-3'>
                          <MDBFile 
                          id='customFile' 
                          onChange={uploadAvatar} />
                      </div> 
                      ) : (
                        <div className='boton-avatar'>
                          <MDBFile 
                          id='customFile' 
                          onChange={uploadAvatar} />
                        </div> 
                      )}
                    </div>
                   
              </div>

              <div className='col-md-9'>
                <MDBCol>

                  <MDBRow className='mb-5'>
                    <MDBCol lg="4" className='mb-3'>
                      <MDBInput label='Nombre' id='typeText' type='text' 
                        value={name} onChange={(e) => setName(e.target.value)}
                      /> 
                    </MDBCol>
                    <MDBCol lg="4" className='mb-3'>
                      <MDBInput label='Apellido' id='typeText' type='text' 
                        value={lastName} onChange={(e) => setLastname(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <DataPicker 
                        value={birth} onChange={(e) => setBirth(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className='mb-5'>
                   <MDBCol lg="4" className='mb-3'>
                      <MDBInput label='Cédula' id='typeText' type='text' 
                        value={idCard} onChange={(e) => setIdCard(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol lg="4" className='mb-3'>
                      <MDBInput label='Teléfono' id='typeText' type='text ' 
                        value={cell} onChange={(e) => setCell(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <MDBInput label='Otro correo' id='typeEmail' type='email' 
                        value={alternativeMail} onChange={(e) => setAlternativeMail(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className='mb-5'>
                    <MDBCol>
                        <MDBInput label='Dirección' id='typeText' type='text' 
                          value={address} onChange={(e) => setAddress(e.target.value)}
                        />
                      </MDBCol>
                  </MDBRow>

                  <MDBRow className='mb-5'>
                    <MDBCol>
                      <MDBInput label='Sector' id='typeText' type='text' 
                        value={sector} onChange={(e) => setSector(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol>
                      <Form.Select  onChange={handleProvinceChange}>
                        <option>Provincia</option>
                        <option value="1">  AZUA </option>
                        <option value="2">	BAHORUCO </option>
                        <option value="3">	BARAHONA </option>
                        <option value="4">	DAJABON </option>
                        <option value="5">	DISTRITO NACIONAL </option>
                        <option value="6">	DUARTE </option>
                        <option value="7">	EL SEYBO </option>
                        <option value="8">	ELIAS PIÑA </option>
                        <option value="9">	ESPAILLAT </option>
                        <option value="10">	HATO MAYOR </option>
                        <option value="11">	HERMANAS MIRABAL </option>
                        <option value="12">	INDEPENDENCIA </option>
                        <option value="13">	LA ALTAGRACIA </option>
                        <option value="14">	LA ALTAGRACIA </option>
                        <option value="15">	LA ROMANA </option>
                        <option value="16">	LA VEGA </option>
                        <option value="17">	MARIA TRINIDAD SANCHEZ </option>
                        <option value="18">	MONSEÑOR NOUEL </option>
                        <option value="19">	MONTE PLATA </option>
                        <option value="20">	MONTECRISTI </option>
                        <option value="21">	PEDERNALES </option>
                        <option value="22">	PERAVIA </option>
                        <option value="23">	PUERTO PLATA </option>
                        <option value="24">	SAMANA </option>
                        <option value="25">	SAN CRISTOBAL </option>
                        <option value="26">	SAN JOSE DE OCOA </option>
                        <option value="27">	SAN JUAN </option>
                        <option value="28">	SAN PEDRO DE MACORIS </option>
                        <option value="29">	SANCHEZ RAMIREZ </option>
                        <option value="30">	SANTIAGO </option>
                        <option value="31">	SANTIAGO RODRIGUEZ </option>
                        <option value="32">	SANTO DOMINGO </option>
                      </Form.Select>
                    </MDBCol> 
                  </MDBRow>
                  
                  <MDBRow className='mb-5'>
                    <MDBCol>
                      <Form.Select  onChange={handleCountryChange}>
                        <option>País</option>  
                        {/* <option value="1">  CUBA </option>
                        <option value="2">	HAITI </option>
                        <option value="3">	JAMAICA </option>
                        <option value="4">	PUERTO RICO </option> */}
                        <option value="5">	República Dominicana </option>
                        {/* <option value="6">	COSTA RICA </option>
                        <option value="7">	EL SALVADOR </option>
                        <option value="8">	GUATEMALA </option>
                        <option value="9">	HONDURAS </option>
                        <option value="10">	NICARAGUA </option>
                        <option value="11">	PANAMA </option>
                        <option value="12">	COLOMBIA </option> */}
                      </Form.Select>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                  <MDBCol>  
                    <div className='fs-5'>Pasatiempo</div>
                    <br />
                    {firstHalfHobbies.map((hobby, index) => (
                      <div key={index}>
                        <MDBSwitch 
                          id={`hobbySwitch${index}`}
                          label={hobby.name}
                          checked={hobby.value}
                          onChange={() => handleHobbiesChange(hobby.name)}
                        />
                        <br />
                      </div>
                    ))}
                  </MDBCol>

                  <MDBCol className='mt-5'>      
                    {secondHalfHobbies.map((hobby, index) => (
                      <div key={hobbies.length / 2 + index}> {/* Asegúrate de que la key sea única */}
                        <MDBSwitch 
                          id={`hobbySwitch${hobbies.length / 2 + index}`}
                          label={hobby.name}
                          checked={hobby.value}
                          onChange={() => handleHobbiesChange(hobby.name)}
                        />
                        <br />
                      </div>
                    ))}
                  </MDBCol>

                    <MDBCol>  
                      <div className='fs-5'>Género</div>
                      <br />
                      <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Masculino' value="Masculino" onChange={handleGender} />
                        <br />
                        <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Femenino' value="Femenino" onChange={handleGender} />
                    </MDBCol>

                    <MDBCol>  
                      <div className='fs-5'>Discapacidad</div>
                      <br />
                      <MDBSwitch id='flexSwitchCheckDefault' label={disability === 'Si' ? 'No' : 'Sí'} value="No" onChange={handleDisability}/>
                    </MDBCol>

                  </MDBRow>
                  
                </MDBCol>
              </div>
            </div>
              
              
            </MDBAccordionItem>
          </MDBAccordion>

          <br />
          <MDBAccordion>
            <MDBAccordionItem collapseId={1} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Experiencia laboral</>}>
            

            <div className='row pt-3 '>

              <div className='col-md-4 empujando-abajo'>
                  <MDBCol>

                    <MDBRow>

                      <MDBCol>
                        <div className='fs-5'>Habilidades Blandas</div>
                        <br />
                        
                          {softSkills.map((skill, index) => (
                            <div key={index}>
                              <MDBSwitch 
                                
                                id={`flexSwitchCheckDefault${index}`} 
                                label={skill.name} 
                                checked={skill.value} // Asegúrate de que el estado del switch refleje el valor actual de la habilidad
                                onChange={() => handleSoftSkillsChange(skill.name)} 
                              />
                              <br />
                            </div>
                          ))}
                       
                        <br />
                        <div className='fs-5'>Nivel de Inglés</div>
                        <br />
                        <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='No Hablo Inglés' value="No Hablo Inglés" onChange={handleEnglishLevel} />
                        <br />
                        <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Inglés Básico' value="Inglés Básico" onChange={handleEnglishLevel} />
                        <br />
                        <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Inglés Medio' value="Inglés Medio"  onChange={handleEnglishLevel} />
                        <br />
                        <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Inglés Profesional' value="Inglés Profesional" onChange={handleEnglishLevel} />
                        <br />
                        <MDBInput label='Otro Idioma' placeholder='Alemán, Italiano, Francés' id='form1' type='text' 
                          value={otherLanguage} onChange={(e) => setOtherLanguage(e.target.value)}
                        />
                      </MDBCol>
                      
                    </MDBRow>
                  </MDBCol>
              </div>

              <div className='col-md-8'>
                  <MDBCol>

                    <MDBRow className='mb-5'>
                      <MDBCol lg="4" className='mb-3'>
                        <Form.Select onChange={handleProfesionChange}>
                          <option>Profesión</option>
                          <option value="1">  Ingenieria en Sistemas </option>
                          <option value="2">	Tecnólogo en Software  </option>
                          <option value="3">	Tecnólogo en Redes </option>
                          <option value="4">	Tecnólogo en Seguridad Informática </option>
                          <option value="5">	DISTRITO NACIONAL </option>
                          <option value="6">	Administrador de Bases de Datos </option>
                          <option value="7">	Arquitecto </option>
                          <option value="8">	Ingeniero Eléctrico, Electromecánico, Robótica </option>
                          <option value="9">	Ingeniero Civil </option>
                          <option value="10">	Ingeniero Industrial </option>
                          <option value="11">	Medicina </option>
                          <option value="12">	Bío-Analista </option>
                          <option value="13">	Enfermería </option>
                          <option value="14">	Contabilidad Finanzas </option>
                          <option value="15">	Administrador de Empresas </option>
                          <option value="16">	Relaciones Internacionales </option>
                          <option value="17">	Hotelería y Turismo </option>
                          <option value="18">	Mercadeo </option>
                          <option value="19">	Maestro </option>
                          <option value="20">	Psicología </option>
                          <option value="21">	Abogado </option>
                          <option value="22">	Asistente </option>
                          <option value="23">	Secretaria </option>
                          <option value="24">	Chofer </option>
                          <option value="25">	Otro </option>
                        </Form.Select>
                      </MDBCol>

                      <MDBCol lg="4">
                        <MDBInput label='Años de Experiencia' id='typeNumber' type='number' 
                          value={yearExperience} onChange={(e) => setYearExperience(e.target.value)}
                        />
                      </MDBCol>

                    </MDBRow>

                    <MDBRow className='mb-4'>
                      <MDBCol>
                        <MDBTextArea label='Objetivos' id='textAreaExample' rows={4} 
                          value={objectives} onChange={(e) => setObjectives(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className='mb-4'>
                      <MDBCol>
                        <div className='fs-5'>
                          Trabajos Recientes
                        </div>
                        <br />
                        <div>
                          {experiences.map((experience) => (
                            <MDBCard key={experience.id} className='mb-3'>
                            <MDBCardBody>
                              <MDBTable>  
                                <MDBInput label='Posición' id='form1' type='text' 
                                  value={experience.position} onChange={(e) => handleExperience(experience.id, 'work_position', e.target.value)}
                                />
                                <br />
                                <MDBInput label='Nombre de la Empresa' id='form1' type='text' 
                                  value={experience.companyName} onChange={(e) => handleExperience(experience.id, 'work_company_name', e.target.value)}
                                />
                                <br />
                                <MDBTextArea label='Descripción del Puesto' id='textAreaExample' rows={4} 
                                  value={experience.description} onChange={(e) => handleExperience(experience.id, 'work_description', e.target.value)}
                                />
                                <br />
                                <MDBRow>
                                  <MDBCol>
                                    <DataPicker label='Fecha de Inicio' 
                                      value={experience.stardDate} onChange={(e) => handleExperience(experience.id, 'work_start_date', e.target.value)}
                                    />
                                  </MDBCol>
                                  <MDBCol>
                                    <DataPicker label='Fecha de Fin'
                                      value={experience.endDate} onChange={(e) => handleExperience(experience.id, 'work_end_date', e.target.value)}
                                    />
                                  </MDBCol>
                                </MDBRow>
                                
                                <MDBRow className='mx-4'>
                                  <MDBCol className='mb-2'>
                                    <MDBSwitch id='flexSwitchCheckDefault' label="Trabajando Actualmente" 
                                      checked={experience.currentlyWorking === "1"} 
                                      onChange={(e) => handleExperience(experience.id, 'currentlyWorking', e.target.checked)}
                                    />
                                  </MDBCol>
                                </MDBRow>
                                <MDBCol>
                                  <MDBBtn onClick={() => removeCard(experience.id)} className='ms-2'>x</MDBBtn>
                                </MDBCol>
                                
                                
                              </MDBTable>
                            </MDBCardBody>
                          </MDBCard>
                          ))}

                          <MDBBtn onClick={addCard}>Agregar Experiencia</MDBBtn>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <div className='fs-5'>
                          Referencia Personal o Laboral
                        </div>
                        <br />
                     
                       
                          {references.map((reference, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <div key={index}>
                              <MDBCard className='mb-3' >
                                <MDBCardBody>

                                  <MDBRow>
                                    <MDBCol lg="4" className='mb-3'>
                                      <MDBInput label='Nombre y Apellido' id={`form1-fullname-${index}`} type='text'
                                        value={reference.fullname}
                                        onChange={(e) => handleReference(index, 'nombre_completo_ref', e.target.value)} />
                                    </MDBCol>
                                    <br />
                                    <MDBCol lg="4" className='mb-3'>
                                      <MDBInput label='Teléfono' id={`form1-phone-${index}`} type='tel'
                                        value={reference.phone}
                                        onChange={(e) => handleReference(index, 'telefono_ref', e.target.value)} />
                                    </MDBCol>
                                    <br />
                                    <MDBCol>
                                      <MDBInput label='Correo' id={`form1-email-${index}`} type='email'
                                        value={reference.email}
                                        onChange={(e) => handleReference(index, 'correo_ref', e.target.value)} />
                                    </MDBCol>
                                  </MDBRow>

                                </MDBCardBody>
                                </MDBCard>
                              
                            </div>
                        ))}
                       
                         
                      </MDBCol>
                    </MDBRow>

                  </MDBCol>
              </div>
            </div>
            </MDBAccordionItem>
          </MDBAccordion>

          <br />
          <MDBAccordion>
            <MDBAccordionItem collapseId={1} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Educación</>}>
             
            <MDBRow className='mb-4'>
              <MDBCol>
                <div className='fs-5 pt-3'>
                  Carrera de Grado
                </div>
                <br />
                <div>
                  {grados.map((grado) => (
                    <div key={grado.id}>
                      <MDBCard className='mb-3'>
                        <MDBCardBody>
                          
                            <MDBRow>
                              <MDBCol lg="4" className='mb-3'>
                                <MDBInput label='Profesión' id='form1' type='text' 
                                  value={grado.profesion}
                                  onChange={(e) => handleGrado(grado.id, 'profession_career', e.target.value)}
                                />
                              </MDBCol>
                              <MDBCol lg="4" className='mb-3'>
                                <MDBInput label='Academia' id='form1' type='text' 
                                  value={grado.academia}
                                  onChange={(e) => handleGrado(grado.id, 'academy', e.target.value)}
                                />
                              </MDBCol>
                              <MDBCol lg="4" className='mb-3'>
                                <DataPicker 
                                  value={grado.endDate} 
                                  onChange={(e) => handleGrado(grado.id, 'date', e.target.value)}
                                />
                              </MDBCol>
                            </MDBRow>
                            <MDBBtn onClick={() => removeGrado(grado.id)}>x</MDBBtn>
                        </MDBCardBody> 
                      </MDBCard>
                      
                    </div>
                  ))}
                  <MDBBtn onClick={addGrado}>Agregar Carrera</MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow className='mb-4'>
              <MDBCol>
                <div className='fs-5 pt-3'>
                  Postgrado/Maestría
                </div>
                <br />
                <div>
                  {postgrados.map((postgrado) => (
                    <div key={postgrado.id}>
                      <MDBCard className='mb-3'>
                        <MDBCardBody>
                          
                            <MDBRow>
                              <MDBCol lg="4" className='mb-3'>
                                <MDBInput label='Maestría' id='form1' type='text' 
                                  value={postgrado.maestria}
                                  onChange={(e) => handlePostGrado(postgrado.id, 'maestria', e.target.value)}
                                />
                              </MDBCol>
                              <MDBCol lg="4" className='mb-3'>
                                <MDBInput label='Academia' id='form1' type='text' 
                                   value={postgrado.academia}
                                   onChange={(e) => handlePostGrado(postgrado.id, 'academia', e.target.value)}
                                />
                              </MDBCol>
                              <MDBCol lg="4" className='mb-3'>
                                <DataPicker 
                                  value={postgrado.endDate}
                                  onChange={(e) => handlePostGrado(postgrado.id, 'endDate', e.target.value)}
                                />
                              </MDBCol>
                            </MDBRow>
                            <MDBBtn onClick={() => removePostgrado(postgrado.id)}>x</MDBBtn>
                        </MDBCardBody> 
                      </MDBCard>
                      
                    </div>
                  ))}
                  <MDBBtn onClick={addPostgrado}>Agregar Maestría</MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol>
                <div className='fs-5 pt-3'>
                  Formación Complementaria
                </div>
                <br />
                <div>
                  {additionalStudies.map((additionalStudy) => (
                    <div key={additionalStudy.id}>
                      <MDBCard className='mb-3'>
                        <MDBCardBody>
                          
                            <MDBRow>
                              <MDBCol lg="4" className='mb-3'>
                                <MDBInput label='Curso' id='form1' type='text' 
                                  value={additionalStudy.curso}
                                  onChange={(e) => handleAddStudies(additionalStudy.id, 'curso', e.target.value)}
                                />
                              </MDBCol>
                              <MDBCol lg="4" className='mb-3'>
                                <MDBInput label='Academia' id='form1' type='text' 
                                  value={additionalStudy.academia}
                                  onChange={(e) => handleAddStudies(additionalStudy.id, 'academia', e.target.value)}
                                />
                              </MDBCol>
                              <MDBCol lg="4" className='mb-3'>
                                <DataPicker 
                                  value={additionalStudy.endDate}
                                  onChange={(e) => handleAddStudies(additionalStudy.id, 'endDate', e.target.value)}
                                />
                              </MDBCol>
                            </MDBRow>
                            <MDBBtn onClick={() => removeAdditionalStudies(additionalStudy.id)}>x</MDBBtn>
                        </MDBCardBody> 
                      </MDBCard>
                      
                    </div>
                  ))}
                  <MDBBtn onClick={addAdditionalStudies}>Agregar Formación</MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>

            </MDBAccordionItem>
          </MDBAccordion>
          <br />
          {/* <input type="submit" value={'Guardar'} className='btn btn-secondary  text-white w-100 rounded py-2 mt-3 fs-5 fw-bold bg-color-rosa' /> */}
          <div className='d-flex justify-content-end'>
            <MDBBtn type='submit' className='submit-cv-b'>Guardar</MDBBtn>
          </div>
        </form> 
      </main>
    </>
    
  )
}
