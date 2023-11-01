import { Navbar } from '../../components/navbar/Navbar'
import { TableArquivos } from '../../components/table/TableArquivos'

export const Arquivos = () => {
  return (
    <>
      <div className='flex h-screen font-sans '>
        <div>
          <Navbar />
        </div>
        <div className='mx-16'>
          <div className='text-center text-2xl m-16'>
            <h1>Arquivos</h1>
          </div>

          <div className='bg-gray-50 rounded p-4'>
            <TableArquivos />
          </div>
        </div>
      </div>

    </>
  )
}
