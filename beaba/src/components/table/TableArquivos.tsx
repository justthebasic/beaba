import { useEffect, useState } from 'react';
// import api from '../../services/api'
import apiFastApi from '../../services/apiFastAPI';
import api from '../../services/api';
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

} from "@tremor/react";
import { format } from 'date-fns';
import { ArquivoType } from '../types';







export const TableArquivos = () => {
    const [arquivos, setArquivos] = useState([]);
    const [selectedArquivo, setSelectedArquivo] = useState<Array<string>>([]);




    useEffect(() => {
        // Recuperar a lista de arquivos do servidor
        api.get('api/arquivos', {

        }).then((response) => {

            setArquivos(response.data);
            console.log(response.data)
            console.log(setArquivos)
        }).catch((error) => {
            console.error('erro ao obter lista de arquivos', error)
        })
    }, []);

    const handleDownload = async (caminho_arquivo: string, nome_arquivo: string) => {
        try {
            const pathWithoutUploads = caminho_arquivo.replace('uploads/', '');
            console.log(pathWithoutUploads)
            const extension = pathWithoutUploads.split('.').pop()
            console.log(extension)

            const response = await apiFastApi.get(`apis/downloadfile/${pathWithoutUploads}`, {
                responseType: 'blob'
            });
            const { file_path, filename } = response.data;
            console.log('Resposta da API:', response.data);
            console.log(file_path)
            console.log(filename)


            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nome_arquivo}.${extension}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Erro ao fazer o download do arquivo Excel:', error);
        }
    };

    const handleDelete = async (arquivoId: number) => {
        try {
            // Chame a API para excluir o arquivo
            await apiFastApi.delete(`apis/deletefile/${arquivoId}`);

            // Atualize a lista de arquivos após a exclusão
            const response = await api.get('api/arquivos');
            setArquivos(response.data);
        } catch (error) {
            console.error('Erro ao excluir o arquivo:', error);
        }
    };


    const isSelected = (arquivo: ArquivoType) =>
        selectedArquivo.includes(arquivo.nome_arquivo) || selectedArquivo.length === 0;


    return (
        <>
            <div className='flex-col h-auto mt-10'>
                <Card>
                    <MultiSelect
                        onValueChange={setSelectedArquivo}
                        placeholder="Select Arquivo"
                        className="max-w-xs mb-6"
                    >
                        {arquivos.map((arquivo: ArquivoType) => (
                            <MultiSelectItem key={arquivo.nome_arquivo} value={arquivo.nome_arquivo}>
                                {arquivo.usuario.nome_usuario}
                            </MultiSelectItem>
                        ))}

                    </MultiSelect>


                    <Table className=" w-full">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Nome arquivo</TableHeaderCell>
                                <TableHeaderCell>Usuario</TableHeaderCell>
                                <TableHeaderCell>Data Criação</TableHeaderCell>
                                <TableHeaderCell>Template</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell>Baixar</TableHeaderCell>
                                <TableHeaderCell>Excluir</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arquivos.filter((arquivo) => isSelected(arquivo)).map((arquivo: ArquivoType) => (
                                <TableRow key={arquivo.id}>
                                    <TableCell>{arquivo.nome_arquivo}</TableCell>
                                    <TableCell>
                                        <Text>{arquivo.usuario.nome_usuario}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{format(new Date(arquivo.data_envio), 'dd/MM/yyyy')}</Text>
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
                                    <TableCell>
                                        <Button
                                            className={"py-2 px-4  rounded-md text-red-500  "}
                                            onClick={() => handleDelete(arquivo.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </Button>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                        {/* <Select
                    className="w-2/8"
                    onValueChange={(value) => setPageSize(Number(value))}
                >
                    {[2, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                        </SelectItem>
                    ))}
                </Select> */}
                    </Table>
                </Card>

            </div>
        </>
    )
}