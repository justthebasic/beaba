import { Button } from "@tremor/react";
import { CadastroTemplate } from "../table/CadastroTemplate";
import React from "react";


export default function ModalCadastroTemplate() {
    const [showModal, setShowModal] = React.useState(false);


    return (
        <>
            <Button
                className="py-2 px-4  rounded-md text-black font-bold bg-green-500 hover:bg-green-600 border-none uppercase text-sm  shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </Button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center   overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-98"
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
                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed  break-all	">

                                    </p>
                                    <CadastroTemplate />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Fechar
                                    </button>
                                    {/* <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button> */}
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
