import React from "react";



export default function PersonalInfo() {
    return (<MDBAccordion>
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
      </MDBAccordion>)
}