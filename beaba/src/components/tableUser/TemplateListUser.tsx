import { useEffect, useState } from 'react';
import api from '../../services/api'

import apiFastApi from '../../services/apiFastAPI';
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
import Modal from '../modal/Modal';
import { useUserStore } from '../../state/state';
import ModalCadastroTemplate from '../modal/ModalCadastroTemplate';
import { TemplateType } from '../types';

const colors = {
    "pendente": "gray",
    "ativo": "emerald",
    "inativo": "rose",
};

const itemsPerPage = 10;


export const TemplateListUser = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Array<string>>([]);
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);

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



    const handleDownloadTemplate = async (templateId: number, nome_template: string, formato: string) => {
        try {
            const response = await apiFastApi.get(`apis/download-${formato}/${templateId}/${nome_template}/${formato}`, {
                responseType: 'blob', // Para receber o arquivo binário
            });

            // Crie um link para download e clique nele para iniciar o download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nome_template}.${formato}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao fazer o download do arquivo Excel:', error);
        }
    }

    const handleDelete = async (templateId: number) => {
        try {
            await api.delete(`api/templates/${templateId}/delete`);

            const response = await api.get('api/templates');
            setTemplates(response.data);
        } catch (error) {
            console.error('Erro ao excluir o template:', error);
        }
    };



    const handleLoadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
    }
    const isUsuario = templates.filter(template => template.usuario.id === user.payload.userId && template.estado === 'ativo')
    const visibleUsuario = isUsuario.slice(0, visibleItems);

    console.log(isUsuario)
    const total = isUsuario.length;
    console.log(total)
    // console.log(usuario)
    const isSelected = (template: TemplateType) => {
        const isSelectedTemplate = selectedTemplate.includes(template.nome_template) || selectedTemplate.length === 0;
        return isSelectedTemplate
    }


    return (
        <>

            <div className='flex-col h-auto mt-10'>
                <Card>
                    <div className='flex gap-6'>
                        <MultiSelect
                            onValueChange={setSelectedTemplate}
                            placeholder="Selecionar Template"
                            className="max-w-xs mb-6"
                        >
                            {isUsuario.map((template: TemplateType) => (
                                <MultiSelectItem key={template.nome_template} value={template.nome_template}>
                                    {template.nome_template}
                                </MultiSelectItem>
                            ))}
                        </MultiSelect>
                        <div className=''>

                            <ModalCadastroTemplate />
                        </div>
                    </div>


                    <Table className="h-full w-full ">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Nome template</TableHeaderCell>
                                <TableHeaderCell>Nome Usuário</TableHeaderCell>
                                <TableHeaderCell>Formato</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>


                                <TableHeaderCell>Visualizar</TableHeaderCell>
                                <TableHeaderCell>Baixar</TableHeaderCell>
                                <TableHeaderCell>Excluir</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleUsuario.filter((template) => isSelected(template)).map((template: TemplateType) => (
                                <TableRow key={template.nome_template}>
                                    <TableCell>{template.nome_template}</TableCell>
                                    <TableCell>{template.usuario.nome_usuario}</TableCell>
                                    <TableCell>
                                        <Text>{template.formato}</Text>

                                    </TableCell>


                                    <TableCell>
                                        {/* <Badge color="emerald" icon={StatusOnlineIcon}>
                                            {template.estado}
                                        </Badge> */}
                                        <Badge color={colors[template.estado]} size="xl">
                                            {template.estado}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>

                                        <Modal>
                                            <h1>
                                                {template.campos?.map((campo) => (
                                                    <div key={campo.nome_campo}>
                                                        {campo.nome_campo}
                                                    </div>
                                                ))}
                                                {template.campos?.length > 0 && (
                                                    <div className='mt-10 text-black text-2xl flex-auto'>
                                                        Quantidade de Colunas: {template.campos.length}
                                                    </div>
                                                )}

                                            </h1>
                                        </Modal>

                                    </TableCell>
                                    <TableCell>
                                        <Button className={"py-2 px-4  rounded-md text-black  "} onClick={() => handleDownloadTemplate(template.id, template.nome_template, `${template.formato}`.toLowerCase())}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </Button>
                                    </TableCell>
                                    <TableCell>

                                        <Button
                                            className={"py-2 px-4  rounded-md text-red-500  "}
                                            onClick={() => handleDelete(template.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        
                    </Table>
                    <div className='flex justify-center'>
                            {visibleItems < isUsuario.length && (
                                <Button onClick={handleLoadMore} className="text-center py-2 px-4 mt-4 rounded-md text-black bg-gray-300 border-0 hover:bg-gray-400">
                                    Carregar Mais
                                </Button>
                            )}
                        </div>
                </Card>

            </div>
        </>
    )
}
