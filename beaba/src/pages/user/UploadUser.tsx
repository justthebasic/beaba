import { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import { InputForm } from '../../components/input/InputForm';

import { useUserStore } from '../../state/state';
import { Navbar } from '../../components/navbar/Navbar';
import apiFastApi from '../../services/apiFastAPI';
import { NavbarUser } from '../../components/navbar/NavbarUser';

interface Template {
  id: number;
  nome_template: string;
}

export const UploadUser = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [nome_arquivo, setNome_arquivo] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  // const [estado, setEstado] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    api.get('/api/templates')
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter lista de templates', error);
      });
  }, []);

  const handleCreateArquivo = async (e: FormEvent) => {
    e.preventDefault();
    const userId = user?.payload.userId;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile as File);
        formData.append('nome_arquivo', nome_arquivo);
        // formData.append('estado', estado );
        formData.append('template_id', selectedTemplate);
        formData.append('usuario_id', userId);
      console.log(formData)
      for (const pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

      const response = await apiFastApi.post('apis/uploadfile', formData);
      console.log(response)

      if (response.status === 200) {
        alert('Cadastro realizado com sucesso');
      } else {
        alert('Erro no cadastro. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      alert('Erro no cadastro!');
      console.error(error)
    }
  };

  const isUsuario = templates.filter(template => template.usuario.id === user.payload.userId )
  return (
    <>
      <form onSubmit={handleCreateArquivo}>
        <div className="flex h-screen font-sans">
          <div className="">
            <NavbarUser />
          </div>
          <div className="w-1/2 mx-auto">
            <div className="text-2xl m-16 text-center">
              <h1>Upload</h1>
            </div>
            <div className="flex my-10">
              <h1 className="p-2 text-lg">Template:</h1>
              <select
                id="template"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 h-1/4 p-2.5 dark:bg-gray-200 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Escolher templates disponíveis</option>
                {isUsuario.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.nome_template}
                  </option>
                ))}
              </select>
              {/* <SearchSelect
                onValueChange={(e) => setSelectedTemplate(e.target.value)}
                placeholder="Selecionar template"
                className="max-w-xs mb-6"
              >
                {templates.map((template) => (
                  <SearchSelectItem key={template.nome_template} value={template.nome_template}>
                    {template.nome_template}
                  </SearchSelectItem>
                ))}
              </SearchSelect> */}
            </div>
            <div className="flex my-10">

              <div className="flex mb-4">
                <label htmlFor="Nome" className="leading-7 text-lg p-2">Nome:</label>
                <input
                  name="name"
                  placeholder='Digite o nome do arquivo...'
                  value={nome_arquivo}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setNome_arquivo(e.target.value)}
                />

              </div>
            </div>
            <div className="flex">
              <input
                type="file"
                name="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="m-auto text-center justify-center flex">
              <div className="rounded p-6 text-center mt-10 flex justify-center items-center bg-green-500 text-white font-bold text-lg hover:bg-green-600">
                <button type="submit">Enviar Arquivo</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
