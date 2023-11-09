// import { useState } from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { Form } from '../../components/form'
import api from '../../services/api'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { NavbarUser } from '../../components/navbar/NavbarUser'
import { useUserStore } from '../../state/state'

const createTemplateSchema = z.object({
  nome_template: z.string().nonempty({
    message: 'O nome é obrigatório',
  }),
  formato: z.string().nonempty({
    message: 'O formato é obrigatório',
  }),
  campos: z.array(
    z.object({
      nome_campo: z.string().nonempty({
        message: 'O nome do campo é obrigatório',
      }),
      tipo: z.string().nonempty({
        message: 'O tipo do campo é obrigatório',
      }),
    })
  ),
});

type CreateTemplateData = z.infer<typeof createTemplateSchema>;

export const CadastroTemplateUser = () => {
  // const [output, setOutput] = useState('');

  const createTemplateForm = useForm<CreateTemplateData>({
    resolver: zodResolver(createTemplateSchema),
  });
  const user = useUserStore((state) => state.user);

  async function createTemplate(data: CreateTemplateData) {
    const userId = user?.payload.userId
    try {
      const response = await api.post('api/templates', {
        nome_template: data.nome_template,
        formato: data.formato,
        campos: data.campos,
        id: userId,
      });

      if (response.status === 200) {
        alert('Cadastro realizado com sucesso');
      } else {
        alert('Erro no cadastro. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro no cadastro. Verifique os dados e tente novamente.');
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
    <div className='flex h-screen'>
    <div className='fixed h-screen '>
      <NavbarUser />
    </div>

    <FormProvider {...createTemplateForm}>
      <form onSubmit={handleSubmit(createTemplate)}>
            <div className='text-center text-2xl m-10'>
              <h1>Cadastro templates</h1>
            </div>
        <div className='text-center m-10 w-screen h-screen justify-center flex-auto ml-64 p-4'>
          <div className='space-y-10'>
            <Form.Field className='flex gap-2 w-1/3'>
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

          <div className='flex'>
            <h1>Campos:</h1>
            <Form.Field>
              <Form.Label className=' w-28 h-20  '>

                <button
                  type="button"
                  onClick={addNewField}
                  className=' inline-flex text-white bg-blue-500 border-0 m-6 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'
                >
                  Add
                </button>
              </Form.Label>
              {fields.map((field, index) => {
                return (
                  <div className='m-4 w-1/3 flex gap-4 ' key={field.id}>
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
                      className='inline-flex text-white bg-red-500 border-0 m-6 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg'
                    >
                      Remover
                    </button>
                  </div>
                );
              })}
            </Form.Field>
          </div>


          <button type='submit' className="flex justify-center items-center text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
            Cadastrar
          </button>
        </div>
      </form>
    </FormProvider>
  </div>
  );
};
