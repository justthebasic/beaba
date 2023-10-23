import { Navbar } from '../components/Navbar'
import { TableArquivos } from '../components/table/Table'

export const TemplatesDisponiveis = () => {
  return (
    <>
      <div className='flex h-screen font-sans '>
        <div>
          <Navbar />

        </div>

        <div className='mx-16'>
          <div className='text-center text-2xl m-16'>
            <h1>Templates Disponiveis</h1>
          </div>

          <div className='bg-gray-50 rounded p-4'>

            <TableArquivos />
          </div>

        </div>
      </div>

    </>
  )
}
