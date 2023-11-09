import { Navbar } from '../../components/navbar/Navbar'
import { TableTemplate } from '../../components/table/TemplateAprovar'

export const AprovarTemplate = () => {
  return (
    <>
      <div className='flex h-screen font-sans'>
        <div className='fixed h-screen '>
          <Navbar />
        </div>

        <div className='flex-auto ml-64 p-4'>
          <div className='text-center text-2xl m-16'>
            <h1>Aprovar Templates</h1>
          </div>
          <div>
            <TableTemplate />
          </div>
        </div>
      </div>
    </>
  )
}
