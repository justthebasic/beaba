// import { useState } from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { Form } from '../../components/form'
import api from '../../services/api'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '../../state/state'
import useLoadingToast from '../../components/ToastConfig'
import toast, { Toaster } from 'react-hot-toast'
import { Card } from '@tremor/react'
// z.string().min(1) instead.
const createTemplateSchema = z.object({
    nome_template: z.string().min(1, {
        message: 'O nome é obrigatório',
    }),
    formato: z.string().min(1, {
        message: 'O formato é obrigatório',
    }),
    campos: z.array(
        z.object({
            nome_campo: z.string().min(1, {
                message: 'O nome do campo é obrigatório',
            }),
            tipo: z.string().min(1, {
                message: 'O tipo do campo é obrigatório',
            }),
        })
    ),
});

type CreateTemplateData = z.infer<typeof createTemplateSchema>;

export const CadastroTemplate = () => {
    // const [output, setOutput] = useState('');
    const user = useUserStore((state) => state.user?.payload);
    const isLoading = useLoadingToast();


    const createTemplateForm = useForm<CreateTemplateData>({
        resolver: zodResolver(createTemplateSchema),
    });

    async function createTemplate(data: CreateTemplateData) {
        const userId = user?.userId
        try {
            const response = await api.post('api/templates', {
                nome_template: data.nome_template,
                formato: data.formato,
                campos: data.campos,
                id: userId,
            });

            if (response.status === 200) {
                toast.success("Cadastro realizado com sucesso");
            } else {
                toast.error('Erro no cadastro. Verifique os dados e tente novamente.')
            }
        } catch (error) {
            console.error(error);
            toast.error('Erro no cadastro!')
        }
    }

    const {
        handleSubmit,
        control,
    } = createTemplateForm;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'campos',
    });

    function addNewField() {
        append({ nome_campo: '', tipo: '' });
    }

    return (
        <div className='flex'>
            <FormProvider {...createTemplateForm}>
                <form onSubmit={handleSubmit(createTemplate)}>

                    <div className='text-center  justify-center p-4'>
                        <div className='space-y-10'>
                            <Form.Field className='flex gap-2'>
                                <Form.Label htmlFor="nome_template">
                                    Nome do Template
                                </Form.Label>
                                <Form.Input type="text" name="nome_template" />
                                <Form.ErrorMessage field="nome_template" />
                            </Form.Field>
                        </div>

                        <div className='flex my-10 gap-4'>
                            <h1 className=''>Formatos de arquivo:</h1>
                            <Form.Field>
                                <Form.Label className='flex gap-2'>
                                    CSV
                                    <Form.Input
                                        type="radio"
                                        name="formato"
                                        value="CSV"
                                    />
                                </Form.Label>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label className='flex gap-2'>
                                    XLS
                                    <Form.Input
                                        type="radio"
                                        name="formato"
                                        value="XLS"
                                    />
                                </Form.Label>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label className='flex gap-2'>
                                    XLSX
                                    <Form.Input
                                        type="radio"
                                        name="formato"
                                        value="XLSX"
                                    />
                                </Form.Label>
                            </Form.Field>
                        </div>

                        <Card>
                            <div className='  inline-flex  overflow-y-auto  inset-0 z-50 outline-none  '>
                                <div className=''>
                                    <h1>Campos:</h1>
                                </div>

                                <Form.Field>
                                    <Form.Label className='inline-flex w-28 mb-4'>
                                        <button
                                            type="button"
                                            onClick={addNewField}
                                            className=' text-white bg-green-500 border-0 ml-6 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                        </button>
                                    </Form.Label>
                                    {fields.map((field, index) => {
                                        return (
                                            <div className=' flex gap-4 ' key={field.id}>
                                                <Form.Field >
                                                    <Form.Label htmlFor={`campos[${index}].nome_campo`}>
                                                        Nome do Campo
                                                    </Form.Label>
                                                    <Form.Input
                                                        type="text"
                                                        name={`campos[${index}].nome_campo`}
                                                    />
                                                    <Form.ErrorMessage field={`campos[${index}].nome_campo`} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Form.Label htmlFor={`campos[${index}].tipo`}>
                                                        Tipo do Campo
                                                    </Form.Label>
                                                    <Form.Select
                                                        name={`campos[${index}].tipo`}
                                                        options={[
                                                            { value: "str", label: "String" },
                                                            { value: "int64", label: "Inteiro" },
                                                            { value: "float", label: "Float" },
                                                            { value: "datetime", label: "DateTime" },
                                                            { value: "boolean", label: "Boolean" }
                                                        ]}
                                                    />
                                                    <Form.ErrorMessage field={`campos[${index}].tipo`} />
                                                </Form.Field>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className='inline-flex text-white bg-red-500 border-0 m-6 p-2 focus:outline-none hover:bg-red-600 rounded text-lg'
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        );
                                    })}
                                </Form.Field>
                            </div>
                        </Card>


                        <button type='submit' disabled={isLoading} className="mt-10 justify-center items-center text-white bg-green-500 border-0 py-2 px-6  focus:outline-none hover:bg-green-600 rounded text-lg">
                            Cadastrar
                        </button>
                        <Toaster />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
