import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({users}) => {

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <th>Users</th>
                    <th>Blogs</th>
                </tr>
                {users.map(user => 
                    <tr key={user.id} >
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                )}
                </tbody>   
            </table>

        </div>
    )
}

export default UserList