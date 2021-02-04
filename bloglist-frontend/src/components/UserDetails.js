import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = ({users, blogs}) => {
    const id = useParams().id
    const user = users.find(u => u.id === id)
    if (!user) return null
    const usersBlogs = blogs.filter(b => b.user.username === user.username)

    return (
        <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
            {usersBlogs.map(blog => 
                <li key={blog.id} >
                    {blog.title}
                </li>
            )}
        </ul>
        </div>
    )
}

export default UserDetails