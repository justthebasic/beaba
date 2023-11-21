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
        toast.error('Erro no cadastro. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.detail) {
        const errors = error.response.data.detail;
        errors.forEach((errorMsg: string) => toast.error(errorMsg));
      } else {
        toast.error('Erro no cadastro!');
      }
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
                <option value="pasta1">Pasta Geral</option>
                <option value="mercantil">Mercantil</option>
                <option value="industrial">Industrial</option>
                <option value="marketing">Marketing</option>
                <option value="logistica">Logística</option>
                <option value="RH">Recursos Humanos</option>
              </select>
            </div>

            <div className="flex">
             
                  {/* <input id="dropzone-file" type="file" className="hidden" /> */}
                  {/* <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"> */}

                  {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label> */}
                  <input
                    id="file_input"
                    type="file"
                    name="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className=' w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-10 file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-900
                    hover:file:bg-gray-400'
                  />
                  
               

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
