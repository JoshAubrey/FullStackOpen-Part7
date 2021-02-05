import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box';

const UserList = ({users}) => {

    return (
        <Box mt={2}>
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

        </Box>
    )
}

export default UserList