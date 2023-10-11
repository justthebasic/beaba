import { useState } from "react";
import { UserRow } from "./UserRow";
import {User} from "./UserRow"





interface UserListProps{
  title: string;
}






const UserList = ({title}: UserListProps) => {

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      nome_completo: 'nome completo',
      email: 'email0000@example.com',
      status: 'pendente',
      cargo: '',
    },
    {
      id: 2,
      nome_completo: 'nome completo',
      email: 'email0000@example.com',
      status: 'pendente',
      cargo: '',
    },
    {
      id: 3,
      nome_completo: 'nome completo',
      email: 'email0000@example.com',
      status: 'pendente',
      cargo: '',
    },
    {
      id: 4,
      nome_completo: 'nome completo',
      email: 'email0000@example.com',
      status: 'pendente',
      cargo: '',
    },
    // ... Outros usuários
  ]);

  const handleSaveUser = (editedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
          <h1 className="text-3xl">{title}</h1>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Nome</th>
                <th className="text-left p-3 px-5">Email</th>
                <th className="text-left p-3 px-5">Cargo</th>
                <th className="text-left p-3 px-5">Status</th>
                <th></th>
              </tr>
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onSave={handleSaveUser}
                  onDelete={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
