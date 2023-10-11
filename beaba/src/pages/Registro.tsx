import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { InputForm } from '../components/input/InputForm'

export const Registro = () => {
  const navigate = useNavigate()

  const [nome_usuario, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleCreateUser = (e: FormEvent) => {
    e.preventDefault()

    api.post('api/users', {
      nome_usuario,
      email,
      senha
    }).then(() => {
      alert('Cadastro realizado com sucesso')

      navigate('/login')
    }).catch(() => {
      alert('Erro no cadastro!')
    })
  }


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

              <form onSubmit={handleCreateUser} className="flex flex-col pt-3 md:pt-8">

                <InputForm
                  name={'name'}
                  label={'Nome Completo'}
                  value={nome_usuario}
                  placeholder='Digite seu nome...'
                  onChange={(e) => { setNome(e.target.value) }}
                />
                <InputForm
                  name={'email'}
                  label={'Email'}
                  value={email}
                  placeholder='Digite seu email...'
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <InputForm
                  name={'senha'}
                  label={'Senha'}
                  value={senha}
                  placeholder='Digite sua senha...'
                  onChange={(e) => { setSenha(e.target.value) }}
                />


                <button type="submit" className="bg-green-600 text-white font-bold text-lg hover:bg-green-700 p-2 mt-4">
                    Cadastrar
                </button>

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
