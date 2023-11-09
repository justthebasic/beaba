import { useEffect, useState } from 'react';
import api from '../../services/api'
import { Grid, _ } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
    Badge,
    Button,
    Card,
    MultiSelect,
    MultiSelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title,
} from "@tremor/react";
import { useUserStore } from '../../state/state';
import apiFastApi from '../../services/apiFastAPI';


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
    const [selectedArquivo, setSelectedArquivo] = useState<string>('');
    const user = useUserStore((state) => state.user);



    
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

    const handleDownload = async (caminho_arquivo: string, nome_arquivo: string) => {
        try {
            const pathWithoutUploads = caminho_arquivo.replace('uploads/', '');
            console.log(pathWithoutUploads)
            // const encodedPath = encodeURIComponent(pathWithoutUploads);
            // console.log(encodedPath)

            // Faz a chamada à API para obter o caminho correto
            const response = await apiFastApi.get(`apis/downloadfile/${pathWithoutUploads}`,{
                responseType: 'blob'
            });
            const { file_path, filename } = response.data;
            console.log('Resposta da API:', response.data);
            console.log(file_path)
            console.log(filename)

            
            
            

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nome_arquivo}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('Erro ao fazer o download do arquivo Excel:', error);
        }
    };

    const isSelected = (arquivo) =>
        selectedArquivo.includes(arquivo.nome_arquivo) || selectedArquivo.length === 0;


        const isUsuario = arquivos.filter(arquivo => arquivo.usuario.id === user.payload.userId )
    return (
        <>
             <div className='flex-col h-auto mt-10'>
                <Card>
                    <MultiSelect
                        onValueChange={setSelectedArquivo}
                        placeholder="Select Arquivo"
                        className="max-w-xs mb-6"
                    >
                        {arquivos.map((arquivo) => (
                            <MultiSelectItem key={arquivo.nome_arquivo} value={arquivo.nome_arquivo}>
                                {arquivo.nome_usuario}
                            </MultiSelectItem>
                        ))}
                    </MultiSelect>


                    <Table className=" w-full">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Nome arquivo</TableHeaderCell>
                                <TableHeaderCell>Usuario</TableHeaderCell>
                                <TableHeaderCell>Template</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>



                                <TableHeaderCell>Baixar</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isUsuario.filter((arquivo) => isSelected(arquivo)).map((arquivo) => (
                                <TableRow key={arquivo.nome_arquivo}>
                                    <TableCell>{arquivo.nome_arquivo}</TableCell>
                                    <TableCell>
                                        <Text>{arquivo.usuario.nome_usuario}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{arquivo.template.nome_template}</Text>
                                    </TableCell>


                                    <TableCell>
                                        <Badge color="emerald" icon={StatusOnlineIcon}>
                                            {arquivo.estado ? 'Válido' : 'Inválido'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button className={"py-2 px-4  rounded-md text-black  "} onClick={() => handleDownload(arquivo.caminho_arquivo, arquivo.nome_arquivo)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </Button>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>

            </div>
        </>
    )
}