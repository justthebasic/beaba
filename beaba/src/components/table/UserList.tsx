import { useEffect, useState } from 'react';
import api from '../../services/api'

import "gridjs/dist/theme/mermaid.css";
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

const colors = {
  "pendente": "gray",
  "ativo": "emerald",
  "inativo": "rose",
};
const itemsPerPage = 5;


export const UserList = () => {
  const [users, setUsersStatus] = useState([]);
  // const user = useUserStore((state) => state.user);
  const [selectedUsuario, setSelectedUsuario] = useState<string>('');
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const [selectedEstado, setSelectedEstado] = useState<string>('');


  useEffect(() => {
    api.get('api/users', {


    }).then((response) => {

      setUsersStatus(response.data);
      console.log(setUsersStatus)
    }).catch((error) => {
      console.error('erro ao obter lista de users', error)
    })
  }, []);

  const handleToggleUser = (userId: number, currentState: string) => {
    const isActive = currentState === 'inativo' || currentState === 'pendente';

    const action = isActive ? 'ativar' : 'desativar';


    api.patch(`/api/users/${userId}/${action}`).then((response) => {
      const updateUsers = users.map((usuario: UsuarioType) => {
        if (usuario.id === userId) {
          return response.data;
        }
        return usuario;
      });
      setUsersStatus(updateUsers);
    });
  };
  const handleToggleUserAdm = (userId: number, currentState: string) => {

    const isAdm = currentState === 'adm';

    const action = isAdm ? 'cargoUser' : 'cargoAdm';

    api.patch(`/api/users/${userId}/${action}`).then((response) => {
      const updateUsers = users.map((usuario: UsuarioType) => {
        if (usuario.id === userId) {
          return response.data;
        }
        return usuario;
      });
      setUsersStatus(updateUsers);
    });
  };

  const handleDelete = async (userId: number) => {
    try {
      await api.delete(`api/users/${userId}/delete`);

      const response = await api.get('api/users');
      setUsersStatus(response.data);
    } catch (error) {
      console.error('Erro ao excluir usuario:', error);
    }
  };

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  }
  const visibleUsuario = users.slice(0, visibleItems);

  const isSelected = (usuario: UsuarioType) => {
    const isSelectedUsuario = selectedUsuario.includes(usuario.nome_usuario) || selectedUsuario.length === 0;
    const isSelectedEstado = selectedEstado.toLowerCase() === usuario.estado.toLowerCase() || selectedEstado.length === 0

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
              {visibleUsuario.filter((usuario) => isSelected(usuario)).map((usuario: UsuarioType) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nome_usuario}</TableCell>
                  <TableCell>
                    <Text>{usuario.email}</Text>
                  </TableCell>


                  <TableCell>
                    <Badge color={colors[usuario.estado]} size="xl">
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
          <div className='flex justify-center mt-4'>
            {visibleItems < users.length && (
              <Button onClick={handleLoadMore} className="text-center py-2 px-4 mt-4 rounded-md text-black bg-gray-300 border-0 hover:bg-gray-400">
                Carregar Mais
              </Button>
            )}
          </div>
        </Card>






      </div>
    </>
  )
}