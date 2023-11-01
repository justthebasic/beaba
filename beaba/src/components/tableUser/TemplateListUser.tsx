import { useEffect, useState } from 'react';
import api from '../../services/api'
import { Grid, _ } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";
import apiFastApi from '../../services/apiFastAPI';



export const TemplateListUser = () => {
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



    const handleDownloadTemplate = async (templateId: number, nome_template: string, formato: string) => {
        try {
            const response = await apiFastApi.get(`apis/download-${formato}/${templateId}/${nome_template}/${formato}`, {
                responseType: 'blob', // Para receber o arquivo binário
            });

            // Crie um link para download e clique nele para iniciar o download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nome_template}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao fazer o download do arquivo Excel:', error);
        }
    }

    const activeTemplates = templates.filter(template => template.estado === 'ativo');

    return (
        <>


            <div className='flex-col h-auto mt-10'>


                <Grid
                    columns={['Nome Template', 'Formato', 'Nº colunas', 'Status', 'Visualizar', 'Baixar']}
                    search={true}
                    sort={true}
                    autoWidth={true}
                    pagination={{
                        limit: 6,
                    }}
                    data={activeTemplates.map((template) => ([
                        [`${template.nome_template}`],
                        [`${template.formato}`],
                        [15,],
                        [`${template.estado}`],
                        [_(<button className={"py-2 px-4  rounded-md text-black  "} onClick={() => alert('Visualizar')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>)],
                        [_(<button className={"py-2 px-4  rounded-md text-black  "} onClick={() => handleDownloadTemplate(template.id, template.nome_template, `${template.formato}`.toLowerCase())}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </button>)],


                    ]))}
                />


            </div>
        </>
    )
}