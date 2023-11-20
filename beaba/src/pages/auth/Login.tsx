import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { InputForm } from '../../components/input/InputForm'
import { useUserStore } from '../../state/state'
import toast, { Toaster } from 'react-hot-toast'



export const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const setIsUserValid = useUserStore((state) => state.setUserValid)
  const user = useUserStore((state) => state.user?.payload);
  const { getDecodedToken, setUser } = useUserStore();



  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    await api.post('api/login', {
      email,
      senha
    }).then((response) => {

      const token = response.data.token;
      
      localStorage.setItem('accessToken', token);
      const decodedToken = getDecodedToken();
      setUser(decodedToken);

      localStorage.setItem('isUserValid', 'true')
      setIsUserValid(true)


      console.log(token)
      if (user) {
        if (user.userCargo === 'adm' && user.userEstado === 'ativo') {
          toast.success('Login administrador realizado com sucesso!')
          navigate('/dashboard');
        } else if (user.userCargo === 'user' && user.userEstado === 'ativo') {
          toast.success('Login usúario realizado com sucesso!')
          navigate('/dashboarduser');
        } else if (user.userCargo === 'adm' && user.userEstado !== 'ativo') {
          toast.error('Adm inativo')
        } else if (user.userCargo === 'user' && (user.userEstado === 'pendente' || user.userEstado !== 'ativo')) {
          toast.error('Usuário pendente ou inativo')
        } else {
          // console.log('Usuário com tipo desconhecido');
          toast.error('Usuário com tipo desconhecido')
        }
      } 

    }).catch(() => {
      // alert('Erro no login! Verifique suas credenciais.')
      toast.error('Erro no login! Verifique suas credenciais.')
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
                  className="h-10 w-auto "
                  src="https://play-lh.googleusercontent.com/rSNCMDzNW9Oe9e0FpII28GMDrWtM2LZZbKBjppDoFuYjMEbR7UK99ISVMhEnwFm9ZgJm"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <h1 className="text-center text-3xl">
                Bem-vindo a <span className="text-green-600">Quero-Quero</span>
              </h1>

              <form onSubmit={handleLogin} className="flex flex-col pt-3 md:pt-8">

                <InputForm
                  name={'email'}
                  type='email'
                  label={'Email'}
                  value={email}
                  placeholder='Digite seu email...'
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <InputForm
                  name={'senha'}
                  type='password'
                  label={'Senha'}
                  value={senha}
                  placeholder='Digite sua senha...'
                  onChange={(e) => { setSenha(e.target.value) }}
                />

                <button type="submit" className=" bg-green-600 text-white font-bold text-lg hover:bg-green-700 p-2 mt-4 ">
                  Entrar
                </button>
                <Toaster />

              </form>

              <div className="text-center pt-12 pb-12">
                <p>
                  Já tem uma conta?{" "}
                  <Link className=" font-semibold" to={"/registro"}>
                    <span className='text-green-600'>Cadastrar</span>
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


