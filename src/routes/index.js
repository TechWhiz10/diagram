import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext'

import PrivateRoute from './PrivateRoute'

import PageLayout from '../layout'
import DashboardPage from '../pages/dashboard'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import ForgotPasswordPage from '../pages/auth/forget'
import ResetPasswordPage from '../pages/auth/resetPassword'
import NotFoundPage from '../pages/notFound'
import DragAndDropSidebar from "../components/flowDiagram/DragAndDropSidebar"


const MyRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<PageLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/project/:id' element={<DragAndDropSidebar />} />
              <Route index element={<DashboardPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default MyRouter;
