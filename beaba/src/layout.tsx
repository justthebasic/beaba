import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Registro } from './pages/Registro'
import { AprovarTemplate } from './pages/AprovarTemplate'
import { Arquivos } from './pages/Arquivos'
import { CadastroTemplate } from './pages/CadastroTemplate'
import { Dashboard } from './pages/Dashboard'
import { TemplatesDisponiveis } from './pages/TemplatesDisponiveis'
import { Upload } from './pages/Upload'
import { Usuarios } from './pages/Usuarios'


export const Layout = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Registro' element={<Registro/>}/>
            <Route path='/Usuarios' element={<Usuarios/>}/>
            <Route path='/AprovarTemplate' element={<AprovarTemplate/>}/>
            <Route path='/CadastroTemplate' element={<CadastroTemplate/>}/>
            <Route path='/TemplatesDisponiveis' element={<TemplatesDisponiveis/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/Arquivos' element={<Arquivos/>}/>
            <Route path='/Upload' element={<Upload/>}/>
        </Routes>
    </BrowserRouter>
  )
}
