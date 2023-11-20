import { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import { useUserStore } from '../../state/state';
import { Sidebar } from '../../components/sidebar/Sidebar';
import apiFastApi from '../../services/apiFastAPI';
import toast, { Toaster } from "react-hot-toast";
import useLoadingToast from '../../components/ToastConfig';




interface Template {
  id: number;
  nome_template: string;
}

export const Upload = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [nome_arquivo, setNome_arquivo] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<string>('');

  // const [estado, setEstado] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const user = useUserStore((state) => state.user);

  const isLoading = useLoadingToast();

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
      formData.append('folder', selectedFolder);

      console.log(formData)
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const response = await apiFastApi.post('apis/uploadfile', formData);
      console.log(response)

      if (response.status === 200) {
        toast.success("Cadastro realizado com sucesso");
      } else {
        toast.error('Erro no cadastro. Verifique os dados e tente novamente.')
      }
    } catch (error) {
      toast.error('Erro no cadastro!')
    }
  };

  return (
    <>
      <form onSubmit={handleCreateArquivo}>
        <div className="flex  ">
          <div className="fixed  ">
            <Sidebar />
          </div>
          <div className="  ml-96 px-10 w-1/2">
            <div className="text-2xl m-16 text-center">
              <h1>Upload</h1>
            </div>
            <div className="flex my-8">
              <h1 className="p-2 text-lg">Template:</h1>
              <select
                id="template"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="border text-sm rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 block w-2/4 h-1/4 p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Escolher templates disponíveis</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.nome_template}
                  </option>
                ))}
              </select>

            </div>
            <div className="flex my-8">

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
            <div className="flex my-8">
              <h1 className="p-2 text-lg">Pasta no Servidor:</h1>
              <select
                id="folder"
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 h-1/4 p-2.5 dark:bg-white dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Escolher pasta no servidor</option>
                <option value="pasta1">Pasta 1</option>
                <option value="pasta2">Pasta 2</option>
                <option value="pasta2">Pasta 3</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>

            <div className="flex">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique </span> ou arraste</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, XLSX (MAX. 100MB)</p>
                  </div>
                  {/* <input id="dropzone-file" type="file" className="hidden" /> */}
                  <input
                    id='dropzone-file'
                    type="file"
                    name="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className='hidden'
                  />
                </label>
              </div>
            </div>
            <div className=" text-center justify-center flex">
              <div className="rounded mb-4 p-4 text-center mt-10 flex justify-center items-center bg-green-500 text-white font-bold text-lg hover:bg-green-600">
                <button type="submit" disabled={isLoading}>Enviar Arquivo</button>
                <Toaster />
              </div>
            </div>
          </div>

        </div>
      </form>
    </>
  );
};
