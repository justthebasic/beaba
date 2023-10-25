import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/auth/Login'
import { Registro } from './pages/auth/Registro'
import { AprovarTemplate } from './pages/admin/AprovarTemplate'
import { Arquivos } from './pages/admin/Arquivos'
import { CadastroTemplate } from './pages/admin/CadastroTemplate'
import { Dashboard } from './pages/admin/Dashboard'
import { TemplatesDisponiveis } from './pages/admin/TemplatesDisponiveis'
import { Upload } from './pages/admin/Upload'
import { Usuarios } from './pages/admin/Usuarios'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='Usuarios' element={<Usuarios />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='AprovarTemplate' element={<AprovarTemplate />} />
          <Route path='CadastroTemplate' element={<CadastroTemplate />} />
          <Route path='TemplatesDisponiveis' element={<TemplatesDisponiveis />} />
          <Route path='Arquivos' element={<Arquivos />} />
          <Route path='Upload' element={<Upload />} />
        </Route>
        <Route path='Login' element={<Login />} />
        <Route path='Registro' element={<Registro />} />
        <Route path='*' element={<Navigate to={"Login"} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
