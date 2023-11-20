import { useEffect, useState } from 'react';
import api from '../../services/api'

import "gridjs/dist/theme/mermaid.css";
import { useUserStore } from '../../state/state';
import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Badge,
  Button,
  Card,
  MultiSelect,
  MultiSelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  
} from "@tremor/react";
import { UsuarioType } from '../types';



export const UserList = () => {
  const [users, setUsersStatus] = useState([]);
  // const user = useUserStore((state) => state.user);
  const [selectedUsuario, setSelectedUsuario] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('');


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
    const isActive = currentState === 'inativo' || currentState === 'pendente';

    // Determine a ação com base no estado atual
    const action = isActive ? 'ativar' : 'desativar';

    // Fazer a solicitação para ativar ou desativar o template

    api.patch(`/api/users/${userId}/${action}`).then((response) => {
      // Atualizar o estado do template na interface
      const updateUsers = users.map((usuario: UsuarioType) => {
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
      const updateUsers = users.map((usuario: UsuarioType) => {
        if (usuario.id === userId) {
          return response.data; // Use a resposta do servidor para atualizar o template
        }
        return usuario;
      });
      setUsersStatus(updateUsers);
    });
  };

  const handleDelete = async (userId: number) => {
    try {
      // Chame a API para excluir o arquivo
      await api.delete(`api/users/${userId}/delete`);

      // Atualize a lista de arquivos após a exclusão
      const response = await api.get('api/users');
      setUsersStatus(response.data);
    } catch (error) {
      console.error('Erro ao excluir usuario:', error);
    }
  };

  const isSelected = (usuario: UsuarioType) => {
    const isSelectedUsuario = selectedUsuario.includes(usuario.nome_usuario) || selectedUsuario.length === 0;
    const isSelectedEstado = selectedEstado.includes(usuario.estado) || selectedEstado.length === 0;

    return isSelectedUsuario && isSelectedEstado;

  }

  // const isSelectedEstado = (usuario) =>

  // const pendenteUsers = users.filter(usuario => usuario.estado === 'pendente');



  return (
    <>


      <div className='flex-col h-auto mt-10'>


        <Card>
          <div className='flex gap-6'>

            <MultiSelect
              onValueChange={setSelectedUsuario}
              placeholder="Selecionar usuario"
              className="max-w-xs mb-6"
            >
              {users.map((usuario: UsuarioType) => (
                <MultiSelectItem key={usuario.nome_usuario} value={usuario.nome_usuario}>
                  {usuario.nome_usuario}
                </MultiSelectItem>
              ))}
            </MultiSelect>
            <select
              onChange={(e) => setSelectedEstado(e.target.value)}
              value={selectedEstado}
              className="max-w-xs mb-6 p-2 border text-gray-500 rounded-lg bg-white border-gray-300"
            >
              <option value="">Selecionar estado</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="pendente">Pendente</option>
            </select>

          </div>


          <Table className="h-full w-full">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nome Usuario</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>


                <TableHeaderCell>Cargo</TableHeaderCell>
                <TableHeaderCell>Ativação</TableHeaderCell>
                <TableHeaderCell>Excluir</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className=''>
              {users.filter((usuario) => isSelected(usuario)).map((usuario: UsuarioType) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nome_usuario}</TableCell>
                  <TableCell>
                    <Text>{usuario.email}</Text>
                  </TableCell>


                  <TableCell>
                    <Badge color="emerald" icon={StatusOnlineIcon}>
                      {usuario.estado}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Button className={"py-2 px-4 border rounded-md text-white bg-blue-600"}
                      onClick={() => handleToggleUserAdm(usuario.id, usuario.cargo)}>

                      {usuario.cargo === 'user' ? 'user' : 'adm'}

                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleToggleUser(usuario.id, usuario.estado)} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover-bg-indigo-600 rounded text-lg">
                      {usuario.estado === 'inativo' || usuario.estado === 'pendente' ? 'Ativar' : 'Desativar'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      className={"py-2 px-4  rounded-md text-red-500  "}
                      onClick={() => handleDelete(usuario.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>






      </div>
    </>
  )
}