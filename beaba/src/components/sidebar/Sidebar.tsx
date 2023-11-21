import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../../state/state';






export const Sidebar = () => {
    const location = useLocation();
    const setIsUserValid = useUserStore((state) => state.setUserValid)

    const user = useUserStore((state) => state.user);
    const { logout } = useUserStore();


    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsUserValid(false);
        logout();
    };



    return (
        <>

            <div className="flex fixed  bg-white h-screen">
                <div className="w-60  bg-green-600 rounded p-3 shadow-lg  justify-center">
                    <div className='w-full mb-6 text-center items-center justify-center'>
                        <Link to={'/dashboard'}>

                            <img src="http://qqtechs.com.br/qqtech/pluginfile.php/1/core_admin/logo/0x200/1657896100/Lojas%20Quero%20Quero.jpg" alt="" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4 p-2 mb-5">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-100">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div className='flex'>
                            <h4 className="font-semibold text-xl text-white capitalize font-poppins tracking-wide pr-6">{user && (
                                <div>
                                    <p>{user.payload.userName.split(" ").slice(0, 1).join(" ")}</p>
                                </div>
                            )}
                            </h4>
                            {/* <span className="text-gray-600">
                                <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </span> */}
                        </div>
                    </div>
                    <ul className="space-y-2 text-lg">
                        <li>
                            <Link to={"/dashboard"}
                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                                ${location.pathname === '/dashboard' ? 'bg-green-500' : ''}`}>
                                <span className="text-gray-600">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        
                                    </svg>
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/usuarios"}
                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                                    ${location.pathname === '/usuarios' ? 'bg-green-500' : ''}`}>
                                <span className="text-gray-600">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        
                                    </svg>
                                </span>
                                <span>Usuários</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={"/templatesdisponiveis"}
                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                            ${location.pathname === '/templatesdisponiveis' ? 'bg-green-500' : ''}`}>
                                <span className="text-gray-600">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        
                                    </svg>
                                </span>
                                <span>Templates</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/upload"}
                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                            ${location.pathname === '/upload' ? 'bg-green-500' : ''}`}>
                                <span className="text-gray-600">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        
                                    </svg>
                                </span>
                                <span>Upload</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/arquivos"}
                                className={`flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline 
                            ${location.pathname === '/arquivos' ? 'bg-green-500' : ''}`}>
                                <span className="text-gray-600">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        
                                    </svg>
                                </span>
                                <span>Arquivos</span>
                            </Link>
                        </li>
                        <div className=''>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className='flex justify-center w-full items-center space-x-3 text-red-600 p-2 mt-11 rounded-md font-medium hover:bg-green-500 focus:bg-green-500 focus:shadow-outline'>
                                    Sair
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>

        </>
    )
}
