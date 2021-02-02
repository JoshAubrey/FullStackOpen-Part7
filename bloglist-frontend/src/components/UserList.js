import React from 'react'
import { useSelector } from 'react-redux'

const UserList = ({}) => {
    const users = useSelector(state => state.users)


    return (
        <div>
            <table>
            <tr><th>Users</th><th>Blogs</th></tr>
                {users.map(user => 
                    <tr><td>{user.name}</td><td>{user.blogs.length}</td></tr>
                )}   
            </table>

        </div>
    )
}

export default UserList