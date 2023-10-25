import { useEffect, useState } from 'react';
import api from '../../services/api'
import { Grid, _ } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";



export const TableTemplate = () => {
    const [templates, setTemplates] = useState([]);

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

    const handleToggleTemplate = (templateId: number, currentState: string) => {
        // Verifique o estado atual do template
        const isActive = currentState === 'ativo';
        // Determine a ação com base no estado atual
        const action = isActive ? 'deactivate' : 'activate';

        // Fazer a solicitação para ativar ou desativar o template
        api.patch(`/api/templates/${templateId}/${action}`).then((response) => {
            // Atualizar o estado do template na interface
            const updatedTemplates = templates.map((template) => {
                if (template.id === templateId) {
                    return response.data; // Use a resposta do servidor para atualizar o template
                }
                return template;
            });
            setTemplates(updatedTemplates);
        });
    };

    return (
        <>
            {/* <h1>Lista de Templates</h1>
            <ul className='m-2 p-2 flex gap-14'>
                {templates.map((template) => (
                    <li key={template.id}>
                        <h2>{template.nome_template}</h2>
                        <p>Formato: {template.formato}</p>
                        <p>Estado: {template.estado}</p>
                        <button onClick={() => handleToggleTemplate(template.id, template.estado === 'ativo')} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            {template.estado === 'ativo' ? 'Desativar' : 'Ativar'}
                        </button>
                    </li>
                ))}
            </ul> */}

            <div className='flex-col h-auto mt-10'>


                <Grid
                    columns={['Nome Template', 'Nº colunas', 'Aprovação', 'Visualizar']}
                    search={true}
                    sort={true}
                    autoWidth={true}
                    pagination={{
                        limit: 6,
                    }}
                    data={templates.map((template) => ([
                        [`${template.nome_template}`],
                        [`${template.campos}`],
                        [_(<button className={"py-2 px-4 border rounded-md text-white bg-blue-600"} onClick={() => handleToggleTemplate(template.id, template.estado === 'ativo')}>{template.estado === 'ativo' ? 'Desativar' : 'Ativar'}</button>)],
                        [_(<button className={"py-2 px-4  rounded-md text-black  "} onClick={() => alert('Visualizar')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>)],


                    ]))}
                />


            </div>
        </>
    )
}
