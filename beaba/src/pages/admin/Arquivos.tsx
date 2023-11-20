
import { Sidebar } from '../../components/sidebar/Sidebar'
import { TableArquivos } from '../../components/table/TableArquivos'

export const Arquivos = () => {
  return (
    <>
      <div className='flex h-screen font-sans '>
        <div className='fixed h-screen  bg-gray-800'>
          <Sidebar />
        </div>
        <div className='flex-auto ml-64 p-4 '>

          <div className='text-center text-2xl m-16'>
            <h1>Arquivos</h1>
          </div>

          <TableArquivos />



        </div>
      </div>

    </>
  )
}
