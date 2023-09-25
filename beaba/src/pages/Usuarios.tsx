import React from 'react'
import { Navbar } from '../components/Navbar'
import UserList from '../components/UserList'

export const Usuarios = () => {
    return (
        <>
            <div className='grid grid-cols-6'>
                <div className='col-span-1'>
                    <Navbar />
                </div>

                <div className='col-span-5'>
                    <UserList />
                </div>
            </div>
        </>
    )
}
