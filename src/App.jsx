import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import UserLayout from './layout/UserLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import User from './pages/User'
import CurriculumVitae from './pages/CurriculumVitae'

import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>
            
          <Route path='/user' element={<UserLayout />}>
            <Route index element={<User />} />
            <Route path='register-cv' element={<CurriculumVitae />} />
          </Route> 
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
