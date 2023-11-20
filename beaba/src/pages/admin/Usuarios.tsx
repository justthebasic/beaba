import { Sidebar } from '../../components/sidebar/Sidebar'
import { UserList } from '../../components/table/UserList'

export const Usuarios = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="fixed h-screen  ">
                    <Sidebar />
                </div>
                <div className="flex-auto ml-64 p-4 ">
                    <div className='text-center text-2xl m-16'>
                        <h1>Usuários</h1>
                    </div>
                    <UserList />

                </div>
            </div>
        </>
    )
}
