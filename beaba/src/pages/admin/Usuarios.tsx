
import { Card } from '@tremor/react'
import { Navbar } from '../../components/navbar/Navbar'
import { UserList } from '../../components/table/UserList'

export const Usuarios = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="fixed h-screen  ">
                    <Navbar />
                </div>
                <div className="flex-auto ml-64 p-4 ">
                    <div className='text-center text-2xl m-16'>
                        <h1>Usuarios</h1>
                    </div>
                    <UserList />

                </div>
            </div>
        </>
    )
}
