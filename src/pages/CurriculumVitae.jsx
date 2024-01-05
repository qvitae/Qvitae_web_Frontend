/* eslint-disable no-undef */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import FormProvider from '../context/CvFormProvider'
import PersonalInfo from '../components/formComponents/PersonalInfo';

import ExperienceInfo from '../components/formComponents/ExperienceInfo';
import EducationInfo from '../components/formComponents/EducationInfo';
import useFetchFormData from '../hooks/useFetchFormData';

// Register Curriculum Vitae form
export default function CurriculumVitae() {

  const {countries, languages, softSkills, careers, hobbies, isLoading} = useFetchFormData()
  
  const {closeSesion} = useAuth()

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
        
        <FormProvider>
          <PersonalInfo availableHobbies={hobbies} isLoading={isLoading} countries={countries} />
          <ExperienceInfo languages={languages} careers={careers} softSkills={softSkills} isLoading={isLoading}/>
          <EducationInfo/>
        </FormProvider>

      </main>
    </>
    
  )
}
