import React, { useState } from 'react'




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






export const UserRow = ({ user, onSave, onDelete }: UserRowProps) => {
  const [editedUser, setEditedUser] = useState(user);

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
      <tr className="border-b hover:bg-orange-100 bg-gray-100">
        <td className="p-3 px-5">
          <input
            type="text"
            name="nome_completo"
            value={editedUser.nome_completo}
            onChange={handleInputChange}
            className="bg-transparent"
          />
        </td>
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
          <input
            type="text"
            name="email"
            value={editedUser.status}
            onChange={handleInputChange}
            className="bg-transparent"
          />
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
    </>
  )
}
