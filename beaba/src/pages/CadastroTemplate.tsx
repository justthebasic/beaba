import React from 'react'
import { Navbar } from '../components/Navbar'
import { Input } from '../components/input/Input'
import { InputRadio } from '../components/input/InputRadio'

export const CadastroTemplate = () => {
  return (
    <>
      <div className='flex'>
        <div>

          <Navbar />
        </div>
        <div className=' text-center m-10 w-screen h-screen justify-center items-center '>
          <div className='space-y-10'>

          <div className='text-center text-2xl'>
            <h1>Cadastro Templates</h1>
          </div>
          <div className='flex'>
            <h1 className='p-2'>Nome:</h1>
            <Input />
          </div>
          <div className='flex'>
            <h1 className='p-2'>Setor:</h1>
            <select id="setor" className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 h-1/4 p-2.5 dark:bg-gray-200  dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Setor</option>
              <option value="US">Setor1</option>
              <option value="CA">Setor2</option>
              <option value="FR">Setor3</option>
              <option value="DE">Setor4</option>
            </select>

          </div>
          </div>
          <div className='flex my-10'>
            <h1 className='p-2'>Formatos de arquivo:</h1>
            <InputRadio />
          </div>
          <div className='flex my-10 w-full '>
            <h1 className='p-2 w-1/4'>Nome das colunas:</h1>
            <div className='w-full '>
              <div className='mb-2'>
                <Input />
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </span>
              </div>
              <div>

                <Input />
                <span className='flex'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>

            </div>
            <h1 className='p-2 w-1/4'>Tipo colunas:</h1>
            <div className='w-full '>
              <div className='mb-2 '>
                <Input />
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </span>
              </div>
              <div>
                <Input />
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
              <div className='w-1/4 h-16 mx-auto my-10 rounded p-6 text-center mt-10 flex justify-center items-center bg-green-500 text-white font-bold hover:bg-green-600 text-lg'>
                <button>Cadastrar</button>
              </div>
        </div>
      </div>
    </>
  )
}
