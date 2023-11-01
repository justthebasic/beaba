
import { NavbarUser } from '../../components/navbar/NavbarUser'
import { TableArquivosUser } from '../../components/tableUser/TableArquivosUser'

export const ArquivosUser = () => {
  return (
    <>
      <div className='flex h-screen font-sans '>
        <div>
          <NavbarUser />
        </div>
        <div className='mx-16'>
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
