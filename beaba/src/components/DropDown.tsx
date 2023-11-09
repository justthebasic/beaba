import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../state/state';

export const DropDown = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const user = useUserStore((state) => state.user);


    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            {user && user.payload.userCargo === 'user' && (
                <div>

                    <nav className='flex justify-center'>
                        <ul className='space-y-2 text-lg'>
                            <li>

                                <button onClick={toggleDropdown} className="text-white flex ">

                                    <span>Templates</span>

                                    <svg className={`h-5  w-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <ul className="absolute bg-green-600 rounded-md py-2 shadow-md ">
                                        <li>
                                            <Link to={"/cadastrotemplateuser"}
                                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                            ${location.pathname === '/usuarios' ? 'bg-green-500' : ''}`}>
                                                <span className="text-gray-600">
                                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        {/* <!-- Adicione o ícone apropriado aqui --> */}
                                                    </svg>
                                                </span>
                                                <span>Cadastro Template</span>
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <Link to={"/templatesdisponiveisuser"}
                                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                            ${location.pathname === '/usuarios' ? 'bg-green-500' : ''}`}>
                                                <span className="text-gray-600">
                                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        {/* <!-- Adicione o ícone apropriado aqui --> */}
                                                    </svg>
                                                </span>
                                                <span>Templates Disponíveis </span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            {user && user.payload.userCargo === 'adm' && (
                <div>
                    <nav className='flex justify-center'>
                        <ul className='space-y-2 text-lg'>
                            <li>

                                <button onClick={toggleDropdown} className="text-white flex ">

                                    <span>Templates</span>

                                    <svg className={`h-5 w-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <ul className="absolute bg-green-600 rounded-md py-2 shadow-md ">
                                        <li>
                                            <Link to={"/cadastrotemplate"}
                                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                            ${location.pathname === '/usuarios' ? 'bg-green-500' : ''}`}>
                                                <span className="text-gray-600">
                                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        {/* <!-- Adicione o ícone apropriado aqui --> */}
                                                    </svg>
                                                </span>
                                                <span>Cadastro Template</span>
                                            </Link>
                                        </li>
                                       
                                        <li>
                                            <Link to={"/templatesdisponiveis"}
                                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                            ${location.pathname === '/usuarios' ? 'bg-green-500' : ''}`}>
                                                <span className="text-gray-600">
                                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        {/* <!-- Adicione o ícone apropriado aqui --> */}
                                                    </svg>
                                                </span>
                                                <span>Templates Disponíveis </span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
};