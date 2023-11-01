// import { TableArquivos } from '../components/table/Table'
import { NavbarUser } from '../../components/navbar/NavbarUser'
import { TemplateListUser } from '../../components/tableUser/TemplateListUser'


export const TemplatesDisponiveisUser = () => {
  return (
    <>
      <div className='flex h-screen font-sans '>
        <div>
          <NavbarUser />

        </div>

        <div className='mx-16'>
          <div className='text-center text-2xl m-16'>
            <h1>Templates Disponiveis</h1>
          </div>

          <div className='bg-gray-50 rounded p-4'>

            <TemplateListUser />
          </div>

        </div>
      </div>

    </>
  )
}
