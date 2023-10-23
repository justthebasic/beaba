import React from 'react'
import { Navbar } from '../components/Navbar'
import UserList from '../components/table/UserList'

export const Usuarios = () => {
    return (
        <>
            <div className='flex h-screen'>
                <div className=''>
                    <Navbar />
                </div>
                <div className='m-10 w-full'>

                <div className='mb-16 w-full'>
                    <UserList title={'Usuários pendentes'} />
                </div>
                <div className=' w-full'>
                    <UserList title={'Usuários'} />
                </div>
                
                </div>
            </div>
        </>
    )
}
