import { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api'
import { Grid, _ } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";
// import { useReactTable } from '@tanstack/react-table'
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



export const TableTemplate = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');


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
        const isActive = currentState === 'inativo';
        const action = isActive ? 'ativar' : 'desativar';

        api.patch(`/api/templates/${templateId}/${action}`).then((response) => {
            const updatedTemplates = templates.map((template) => {
                if (template.id === templateId) {
                    return response.data; // Use a resposta do servidor para atualizar o template
                }
                return template;
            });
            setTemplates(updatedTemplates);
        });
    };


    const isSelected = (template) =>
        selectedTemplate.includes(template.nome_template) || selectedTemplate.length === 0;

    return (
        <>
            {/* <h1>Lista de Templates</h1>
            <ul className='m-2 p-2 flex gap-14'>
                {templates.map((template) => (
                    <li key={template.id}>
                        <h2>{template.nome_template}</h2>
                        <p>Formato: {template.formato}</p>
                        <p>Estado: {template.estado}</p>
                        <button onClick={() => handleToggleTemplate(template.id, template.estado)} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover-bg-indigo-600 rounded text-lg">
                            {template.estado === 'ativo' ? 'Desativar' : 'Ativar'}
                        </button>
                    </li>
                ))}
            </ul> */}

            <div className='flex-col h-auto mt-10'>
                <Card>
                    <MultiSelect
                        onValueChange={setSelectedTemplate}
                        placeholder="Select Salespeople..."
                        className="max-w-xs mb-6"
                    >
                        {templates.map((template) => (
                            <MultiSelectItem key={template.nome_template} value={template.nome_template}>
                                {template.nome_usuario}
                            </MultiSelectItem>
                        ))}
                    </MultiSelect>

                    
                    <Table className="h-full w-full">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Nome template</TableHeaderCell>
                                <TableHeaderCell>Formato</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>


                                <TableHeaderCell>Aprovação</TableHeaderCell>
                                <TableHeaderCell>Visualizar</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {templates.filter((template) => isSelected(template)).map((template) => (
                                <TableRow key={template.nome_template}>
                                    <TableCell>{template.nome_template}</TableCell>
                                    <TableCell>
                                        <Text>{template.formato}</Text>
                                    </TableCell>


                                    <TableCell>
                                        <Badge color="emerald" icon={StatusOnlineIcon}>
                                            {template.estado}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleToggleTemplate(template.id, template.estado)} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover-bg-indigo-600 rounded text-lg">
                                            {template.estado === 'ativo' ? 'Desativar' : 'Ativar'}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className={"py-2 px-4  rounded-md text-black  "} onClick={() => alert('Visualizar')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
