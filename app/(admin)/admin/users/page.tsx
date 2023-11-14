

import UsersList from '@/components/adminComponents/users-table'
import React from 'react'

const UsersPage = () => {

    return (
        <div className='m-5'>
            <h2 className='text-center text-2xl mb-5'>All Users</h2>
            <UsersList />
        </div>
    )
}

export default UsersPage
