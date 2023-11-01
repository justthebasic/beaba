import { useEffect, useState } from 'react';
import api from '../../services/api'
import { Grid, _ } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";


// type ArquivoType = {
//     id: number;
//     nome_arquivo: string;
//     caminho_arquivo: string;
//     data_envio: string;
//     estado: boolean;
//     usuario: {
//       id: number;
//       nome_usuario: string;
//     };
//     template: {
//       id: number;
//       nome_template: string;
//     };
//   };


export const TableArquivosUser = () => {
    const [arquivos, setArquivos] = useState([]);


    
    useEffect(() => {
        // Recuperar a lista de arquivos do servidor
        api.get('api/arquivos', {

        }).then((response) => {

            setArquivos(response.data);
            console.log(setArquivos)
        }).catch((error) => {
            console.error('erro ao obter lista de arquivos', error)
        })
    }, []);

    const activeArquivos = arquivos.filter(arquivo => arquivo.estado === true);


    return (
        <>
            <div className='flex-col h-auto mt-10'>


                <Grid
                    columns={['Nome arquivo','Usuario', 'Nº colunas', 'Nº linhas', 'Template', 'Status', 'Baixar']}
                    search={true}
                    sort={true}
                    autoWidth={true}
                    pagination={{
                        limit: 6,
                    }}
                    data={activeArquivos.map((arquivo) => ([
                        [`${arquivo.nome_arquivo}`],
                        [`${arquivo.usuario.nome_usuario}`],
                        [`${arquivo.id}`],
                        [15,],
                        [`${arquivo.template.nome_template}`],
                        [`${arquivo.estado ? 'Válido' : 'Inválido'}`],
                        [_(<button className={"py-2 px-4  rounded-md text-black  "} onClick={() => alert('Visualizar')}>
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