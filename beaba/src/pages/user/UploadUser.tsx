import { FormEvent, useEffect, useState } from 'react';
// import { Input } from '../../components/input/Input'
import api from '../../services/api';
import { InputForm } from '../../components/input/InputForm';
import { useUserStore } from '../../state/state';
import { NavbarUser } from '../../components/navbar/NavbarUser';


export const UploadUser = () => {
    const [templates, setTemplates] = useState([]);
    const [nome_arquivo, setNome_arquivo] = useState('')
    const [selectFile, setSelectFile] = useState('')
    const [selectedTemplate, setSelectedTemplate] = useState('');



    const user = useUserStore((state) => state.user);



    useEffect(() => {
        // Recuperar a lista de templates do servidor
        api.get('api/templates', {

        }).then((response) => {

            setTemplates(response.data);
            console.log(setTemplates)
        }).catch((error) => {
            console.error('erro ao obter lista de templates', error)
        })
    }, []);



    async function handleCreateArquivo(e: FormEvent) {
        e.preventDefault()
        const userId = user?.payload.userId


        try {
            const response = await api.post('api/arquivos', {
                nome_arquivo,
                caminho_arquivo: selectFile, // Pode ser ajustado conforme necessário
                estado: false, // Defina o estado conforme necessário
                template_id: parseInt(selectedTemplate),
                usuario_id: userId,
            })
            if (response.status === 200) {

                alert('Cadastro realizado com sucesso')
            } else {
                alert('Erro no cadastro. Verifique os dados e tente novamente.');
            }

        } catch (error) {
            alert('Erro no cadastro!')
        }


    }



    return (
        <>
            <form onSubmit={handleCreateArquivo}>
                <div className='flex h-screen font-sans'>
                    <div className=''>
                        <NavbarUser />
                    </div>
                    <div className=' w-1/2 mx-auto '>
                        <div className='text-2xl m-16 text-center'>
                            <h1>Upload</h1>
                        </div>
                        <div className='flex my-10'>
                            <h1 className='p-2'>Template:</h1>
                            <select
                                id="template"
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 h-1/4 p-2.5 dark:bg-gray-200 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Escolher templates disponíveis</option>
                                {templates.map((template) => (
                                    <option key={template.id} value={template.id}>
                                        {template.nome_template}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex my-10'>
                            <InputForm
                                name={'name'}
                                label={'Nome:'}
                                value={nome_arquivo}
                                className='flex bg-red-500'
                                onChange={(e) => { setNome_arquivo(e.target.value) }}
                            />
                        </div>
                        <div className='flex'>
                            <InputForm
                                type='file'
                                name={'name'}
                                label={'Selecionar arquivo'}
                                value={selectFile}
                                className='flex bg-red-500'
                                onChange={(e) => { setSelectFile(e.target.value) }}
                            />
                        </div>
                        <div className='m-auto text-center justify-center flex '>
                            <div className='rounded p-6 text-center mt-10 flex justify-center items-center bg-green-500 text-white font-bold text-lg hover:bg-green-600'>
                                <button type='submit'>Enviar Arquivo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
