import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import { Form } from '../form';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'






export type User = {
  id: number
  nome_completo: string;
  email: string;
  status: string;
  cargo: string;
}

type UserRowProps = {
  user: User;
  onSave: (editedUser: User) => void;
  onDelete: (userId: number) => void;
}

const createUserSchema = z.object({
  nome_usuario: z.string().nonempty({
    message: 'O nome é obrigatório',
  }),
  // formato: z.string().nonempty({
  //   message: 'O formato é obrigatório',
  // }),
  // campos: z.array(
  //   z.object({
  //     nome_campo: z.string().nonempty({
  //       message: 'O nome do campo é obrigatório',
  //     }),
  //     tipo: z.string().nonempty({
  //       message: 'O tipo do campo é obrigatório',
  //     }),
  //   })
  // ),
});

type CreateUserData = z.infer<typeof createUserSchema>;

export const UserRow = ({ user, onSave, onDelete }: UserRowProps) => {
  const [editedUser, setEditedUser] = useState(user);
  const [users, setUsersStatus] = useState([]);

  

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
    // Verifique o estado atual do template
    const isActive = currentState === 'ativo';

    // Determine a ação com base no estado atual
    const action = isActive ? 'deactivate' : 'activate';

    // Fazer a solicitação para ativar ou desativar o template
    api.patch(`/api/users/${userId}/${action}`).then((response) => {
      // Atualizar o estado do template na interface
      const updateUsers = users.map((user) => {
        if (user.id === userId) {
          return response.data; // Use a resposta do servidor para atualizar o template
        }
        return user;
      });
      setUsersStatus(updateUsers);
    });
  };

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    handleSubmit,
    control,
  } = createTemplateForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'usuarios',
  });





  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedUser);
  };

  const handleDeleteClick = () => {
    onDelete(user.id);
  };


  return (
    <>
      <FormProvider {...createUserForm}>
        <form onSubmit={handleSubmit(saveUser)}>
          <div>

            {users.map((user, index) => (

              <tr className="border-b hover:bg-orange-100 bg-gray-100" key={user.id}>
                <Form.Field className="p-3 px-5">
                  <Form.Label htmlFor={`usuarios[${index}].nome_usuario`}>
                    Nome do Campo
                  </Form.Label>
                  <Form.Input
                    type="text"
                    name={`usuarios[${index}].nome_usuario`}
                  />
                  <input
                    type="text"
                    name="nome_completo"
                    value={editedUser.nome_completo}
                    onChange={handleInputChange}
                    className="bg-transparent"
                  />
                </Form.Field>
                <td className="p-3 px-5">
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="bg-transparent"
                  />
                </td>
                <td className="p-3 px-5">
                  <select
                    name="cargo"
                    value={editedUser.cargo}
                    onChange={handleInputChange}
                    className="bg-transparent"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-3 px-5">
                  <button
                    className={"py-2 px-4 border rounded-md text-white bg-blue-600"}
                    onClick={() => handleToggleUser(user.id, user.estado === 'ativo')}>
                    {user.estado === 'ativo' ? 'Desativar' : 'Ativar'}
                  </button>
                </td>
                <td className="p-3 px-5 flex justify-end">
                  <button
                    type="button"
                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </div>
        </form>
      </FormProvider>
    </>
  )
}
