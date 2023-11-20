import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/auth/Login'
import { Registro } from './pages/auth/Registro'
import { Arquivos } from './pages/admin/Arquivos'

import { Dashboard } from './pages/admin/Dashboard'
import { TemplatesDisponiveis } from './pages/admin/TemplatesDisponiveis'
import { Upload } from './pages/admin/Upload'
import { Usuarios } from './pages/admin/Usuarios'
import { DashboardUser } from './pages/user/DashboardUser'

import { TemplatesDisponiveisUser } from './pages/user/TemplatesDisponiveisUser'
import { ArquivosUser } from './pages/user/ArquivosUser'
import { UploadUser } from './pages/user/UploadUser'







ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='Usuarios' element={<Usuarios />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='DashboardUser' element={<DashboardUser />} />
          <Route path='TemplatesDisponiveis' element={<TemplatesDisponiveis />} />
          <Route path='TemplatesDisponiveisUser' element={<TemplatesDisponiveisUser />} />
          <Route path='Arquivos' element={<Arquivos />} />
          <Route path='ArquivosUser' element={<ArquivosUser />} />
          <Route path='Upload' element={<Upload />} />
          <Route path='UploadUser' element={<UploadUser />} />
        </Route>
        <Route path='Login' element={<Login />} />
        <Route path='Registro' element={<Registro />} />
        <Route path='*' element={<Navigate to={"Login"} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
