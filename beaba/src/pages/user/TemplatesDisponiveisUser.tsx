// import { TableArquivos } from '../components/table/Table'
import { SidebarUser } from '../../components/sidebar/SidebarUser'
import { TemplateListUser } from '../../components/tableUser/TemplateListUser'


export const TemplatesDisponiveisUser = () => {
  return (
    <>
      <div className='flex h-screen font-sans '>
        <div className='fixed h-screen'>
          <SidebarUser />

        </div>

        <div className='flex-auto ml-64 p-4'>
          <div className='text-center text-2xl m-16'>
            <h1>Templates Disponiveis</h1>
          </div>



          <TemplateListUser />


        </div>
      </div>

    </>
  )
}
