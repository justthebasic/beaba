import { useEffect, useState } from 'react';
import api from '../../services/api'
import { Grid, _ } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";
import { useUserStore } from '../../state/state';

interface UserListProps {
  title: string;
}

export const UserList = ({ title }: UserListProps) => {
  const [users, setUsersStatus] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // Recuperar a lista de users do servidor
    api.get('api/users', {


    }).then((response) => {

      setUsersStatus(response.data);
      console.log(setUsersStatus)
    }).catch((error) => {
      console.error('erro ao obter lista de users', error)
    })
  }, []);

  const handleToggleUser = (userId: number, currentState: string) => {
    // Verifique o estado atual do usuario
    const isActive = currentState === 'inativo';

    // Determine a ação com base no estado atual
    const action = isActive ? 'ativar' : 'desativar';

    // Fazer a solicitação para ativar ou desativar o template
    
    api.patch(`/api/users/${userId}/${action}`).then((response) => {
      // Atualizar o estado do template na interface
      const updateUsers = users.map((usuario) => {
        if (usuario.id === userId) {
          return response.data; // Use a resposta do servidor para atualizar o template
        }
        return usuario;
      });
      setUsersStatus(updateUsers);
    });
  };
  const handleToggleUserAdm = (userId: number, currentState: string) => {
    // Verifique o estado atual do usuario

    // Determine a ação com base no estado atual
    const isAdm = currentState === 'adm';

    // Determine a ação com base no estado atual
    const action = isAdm ? 'cargoUser' : 'cargoAdm';

    // Fazer a solicitação para ativar ou desativar o template
    
    api.patch(`/api/users/${userId}/${action}`).then((response) => {
      // Atualizar o estado do template na interface
      const updateUsers = users.map((usuario) => {
        if (usuario.id === userId) {
          return response.data; // Use a resposta do servidor para atualizar o template
        }
        return usuario;
      });
      setUsersStatus(updateUsers);
    });
  };
  

  const pendenteUsers = users.filter(usuario => usuario.estado === 'pendente');


  return (
    <>


      <div className='flex-col h-auto mt-10'>
        <div className='p-4 flex"'>
          <h1 className='text-3xl'>{title}</h1>
        </div>

        <Grid
          columns={['Nome Usuario', 'Email', 'Estado', 'Cargo', 'Ativação']}
          search={true}
          sort={true}
          autoWidth={true}
          pagination={{
            limit: 3,
          }}
          data={pendenteUsers.map((usuario) => ([
            [`${usuario.nome_usuario}`],
            [`${usuario.email}`],
            [`${usuario.estado}`],
            [_(<select
              className={"py-2 px-4 border rounded-md text-white bg-blue-600"}
              onClick={() => handleToggleUserAdm(usuario.id, usuario.estado)}>
              <option>{usuario.cargo === 'user' ? 'user' : 'user'}</option>
              <option>{usuario.cargo === 'user' ? 'adm' : 'adm'}</option>
            </select>)],
            [_(<button
              className={"py-2 px-4 border rounded-md text-white bg-blue-600"}
              onClick={() => handleToggleUser(usuario.id, usuario.estado)}>
              {usuario.estado === 'ativo' ? 'Desativar' : 'Ativar'}
            </button>)],
          ]))}
        />
        <Grid
          columns={['Nome Usuario', 'Email', 'Estado', 'Cargo', 'Ativação']}
          search={true}
          sort={true}
          autoWidth={true}
          pagination={{
            limit: 3,
          }}
          data={users.map((usuario) => ([
            [`${usuario.nome_usuario}`],
            [`${usuario.email}`],
            [`${usuario.estado}`],
            [_(<select
              className={"py-2 px-4 border rounded-md text-white bg-blue-600"}
              onClick={() => handleToggleUserAdm(usuario.id, usuario.estado)}>
              <option>{usuario.cargo === 'user' ? 'user' : 'user'}</option>
              <option>{usuario.cargo === 'user' ? 'adm' : 'adm'}</option>
            </select>)],
            [_(<button
              className={"py-2 px-4 border rounded-md text-white bg-blue-600"}
              onClick={() => handleToggleUser(usuario.id, usuario.estado)}>
              {usuario.estado === 'ativo' ? 'Desativar' : 'Ativar'}
            </button>)],
          ]))}
        />


      </div>
    </>
  )
}