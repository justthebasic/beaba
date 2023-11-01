// import App from '../App'
// import './index.css'
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import { Login } from '../pages/auth/Login'
// import { Registro } from '../pages/auth/Registro'
// import { AprovarTemplate } from '../pages/admin/AprovarTemplate'
// import { Arquivos } from '../pages/admin/Arquivos'
// import { CadastroTemplate } from '../pages/admin/CadastroTemplate'
// import { Dashboard } from '../pages/admin/Dashboard'
// import { TemplatesDisponiveis } from '../pages/admin/TemplatesDisponiveis'
// import { Upload } from '../pages/admin/Upload'
// import { Usuarios } from '../pages/admin/Usuarios'
// import { DashboardUser } from '../pages/user/DashboardUser'
// import { CadastroTemplateUser } from '../pages/user/CadastroTemplateUser'
// import { TemplatesDisponiveisUser } from '../pages/user/TemplatesDisponiveisUser'
// import { ArquivosUser } from '../pages/user/ArquivosUser'
// import { UploadUser } from '../pages/user/UploadUser'
// import { useUserStore } from '../state/state'




// export const MainRoutes = () => {
//     const isAdm =  useUserStore((state) => state.user?.payload.userCargo);
//     return (
//         <>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path='/' element={<App />}>
//                         <Route path='Usuarios' element={isAdm && <Usuarios />} />
//                         <Route path='Dashboard' element={isAdm && <Dashboard />} />
//                         <Route path='DashboardUser' element={<DashboardUser />} />
//                         <Route path='AprovarTemplate' element={isAdm && <AprovarTemplate />} />
//                         <Route path='CadastroTemplate' element={isAdm && <CadastroTemplate />} />
//                         <Route path='CadastroTemplateUser' element={<CadastroTemplateUser />} />
//                         <Route path='TemplatesDisponiveis' element={isAdm && <TemplatesDisponiveis />} />
//                         <Route path='TemplatesDisponiveisUser' element={<TemplatesDisponiveisUser />} />
//                         <Route path='Arquivos' element={isAdm && <Arquivos />} />
//                         <Route path='ArquivosUser' element={<ArquivosUser />} />
//                         <Route path='Upload' element={isAdm && <Upload />} />
//                         <Route path='UploadUser' element={<UploadUser />} />
//                     </Route>
//                     <Route path='Login' element={<Login />} />
//                     <Route path='Registro' element={<Registro />} />
//                     <Route path='*' element={<Navigate to={"Login"} />} />
//                 </Routes>
//             </BrowserRouter>
//         </>
//     )
// }
