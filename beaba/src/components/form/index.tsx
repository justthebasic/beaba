import { Field } from "./Field"
import { Label } from "./Label"
import { Input } from "./Input"
import { ErrorMessage } from "./ErrorMessage"


export const Form = {
    ErrorMessage,
    Label,
    Input,
    Field,
}


const teste = () => {

    return (
        <>
            <div className='flex'>
                <div>
                    <Navbar />
                </div>
                <FormProvider {...createTemplateForm}>
                    <form
                        onSubmit={handleSubmit(createTemplate)}
                    >
                        <div className=' text-center m-10 w-screen h-screen justify-center items-center '>
                            <div className='space-y-10'>
                                <div className='text-center text-2xl'>
                                    <h1>Cadastro Templates</h1>
                                </div>
                                <div className='flex'>
                                    <h1 className='p-2'>Nome:</h1>
                                    <InputForm
                                        id='nome_template'
                                        label={''}
                                        name={'nome_template'}
                                        value={nome_template}
                                        onChange={(e) => setNome_template(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className='flex my-10'>
                                <h1 className='p-2'>Formatos de arquivo:</h1>
                                <InputRadio
                                    id='CSV'
                                    label={'CSV'}
                                    name='formato'
                                    value={formato}
                                    onChange={(e) => setFormato(e.target.value)}
                                />
                                <InputRadio

                                    id='XLS'
                                    label={'XLS'}
                                    name='formato'
                                    value={formato}
                                    onChange={(e) => setFormato(e.target.value)}
                                />
                                <InputRadio
                                    id='XLSX'
                                    label={'XLSX'}
                                    name='formato'
                                    value={formato}
                                    onChange={(e) => setFormato(e.target.value)}
                                />

                            </div>


                            <div className='inline-flex my-10 w-full '>
                                <h1 className='p-2 w-1/4'>Campo:</h1>
                                <div className='w-full '>
                                    <div className='mb-2'>
                                        {/* form */}
                                        <Form.Field>
                                            <Form.Label>
                                                Campos

                                                <button
                                                    type='button'
                                                    onClick={addNewField}
                                                >
                                                    Add
                                                </button>
                                            </Form.Label>

                                            {fields.map((field, index) => {
                                                const fieldName = `campos.${index}.title`

                                                return (
                                                    <Form.Field key={field.id}>
                                                        <div className='flex gap-2 items-center'>
                                                            <Form.Input type={fieldName} name={fieldName} />

                                                            <button
                                                                type='button'
                                                                onClick={() => remove(index)}
                                                                className='text-red-500'
                                                            >
                                                                rem
                                                            </button>


                                                        </div>
                                                    </Form.Field>
                                                )
                                            })}
                                        </Form.Field>

                                    </div>
                                </div>
                            </div>

                            <div className='w-1/4 h-16 mx-auto my-10 rounded p-6 text-center mt-10 flex justify-center items-center bg-green-500 text-white font-bold hover:bg-green-600 text-lg'>
                                <button onClick={handleCreateTemplate}>Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </FormProvider>

            </div>
        </>
    )
}
