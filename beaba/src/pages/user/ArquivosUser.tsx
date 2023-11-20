
import { SidebarUser } from '../../components/sidebar/SidebarUser'
import { TableArquivosUser } from '../../components/tableUser/TableArquivosUser'

export const ArquivosUser = () => {
  return (
    <>
      <div className='flex h-screen font-sans '>
        <div className='fixed h-screen  bg-gray-800'>
          <SidebarUser />
          </div>
        <div className='flex-auto ml-64 p-4 '>

        <div className='text-center text-2xl m-16'>
            <h1>Arquivos</h1>
          </div>

          <div className='bg-gray-50 rounded p-4'>
            <TableArquivosUser />
          </div>
        </div>
      </div>

    </>
  )
}
