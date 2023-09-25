import React from 'react'
import { Link } from 'react-router-dom'

export const Registro = () => {
  return (
    <>
      <main className="bg-white font-sans h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-1/2 shadow-2xl">
            <img
              className="object-cover w-full h-screen hidden md:block"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Logo"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex justify-center md:justify-end pt-12 md:pr-12 md:-mb-24">
              <Link className=" text-black font-bold text-xl p-4 shadow-inner rounded-2xl" to={"/login"}>
                <span className="sr-only">Quero-Quero</span>
                <img
                  className="h-10 w-auto"
                  src="https://play-lh.googleusercontent.com/rSNCMDzNW9Oe9e0FpII28GMDrWtM2LZZbKBjppDoFuYjMEbR7UK99ISVMhEnwFm9ZgJm"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <h1 className="text-center text-3xl">
                Bem-vindo a <span className="text-green-600">Quero-Quero</span>
              </h1>

              <form className="flex flex-col pt-3 md:pt-8">
                <div className="flex flex-col pt-4">
                  <label htmlFor="text" className="text-lg">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Digite seu nome completo..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 
                                        text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div className="flex flex-col pt-4">
                  <label htmlFor="email" className="text-lg">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Digite seu email..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 
                                        text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="text-lg">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Digite sua senha..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 
                                        text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline "
                  />
                </div>

                <input
                  type="submit"
                  className="bg-green-600 text-white font-bold text-lg hover:bg-green-700 p-2 mt-4"
                />
              </form>

              <div className="text-center pt-12 pb-12">
                <p>
                  Já tem uma conta?{" "}
                  <Link className=" font-semibold" to={"/login"}>
                    <span className='text-green-600'>Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
