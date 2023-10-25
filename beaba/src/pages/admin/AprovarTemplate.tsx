import React from 'react'
import { Navbar } from '../../components/Navbar'
import { TableTemplate } from '../../components/table/TemplateAprovar'

export const AprovarTemplate = () => {
  return (
    <>
      <div className='flex h-screen font-sans'>
        <div>
          <Navbar />
        </div>

        <div className='mx-16'>
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
