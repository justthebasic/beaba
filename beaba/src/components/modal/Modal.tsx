import { Button } from "@tremor/react";
import React, { ReactNode, useEffect, useState } from "react";

import api from "../../services/api";

type FooProps = {

    // look here 👇
    children: ReactNode
}



export default function Modal(props: FooProps) {
    const [showModal, setShowModal] = React.useState(false);

    const [templates, setTemplates] = useState([]);


    useEffect(() => {
        
        api.get('api/templates/', {

        }).then((response) => {

            setTemplates(response.data);
            console.log(setTemplates)
        }).catch((error) => {
            console.error('erro ao obter lista de templates', error)
        })
    }, []);
    return (
        <>
            <Button
                className="py-2 px-4  rounded-md text-black font-bold uppercase text-sm  shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </Button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Template
                                    </h3>

                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto break-all">
                                    <h1 className="text-2xl text-black">Nome colunas:</h1>
                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed  break-all	">

                                    {props.children}
                                    </p>


                                </div>


                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Fechar
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}