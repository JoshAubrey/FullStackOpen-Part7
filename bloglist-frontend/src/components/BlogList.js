import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogListItem from './BlogListItem'
import Box from '@material-ui/core/Box';

const BlogList = ({blogs, currentUser, handleCreateBlog, handleLikeBlog, handleDeleteBlog}) => {
    const blogFormRef = useRef()

    return (
        <Box mt={2}>

            <Togglable buttonLabel='Add new' ref={blogFormRef}>
                <BlogForm handleCreateBlog={handleCreateBlog}/>
            </Togglable>

            {blogs.map(blog =>
                <BlogListItem 
                    key={blog.id} 
                    blog={blog} 
                    handleLikeBlog={handleLikeBlog} 
                    handleDeleteBlog={handleDeleteBlog} 
                    currentUser={currentUser}
                />
            )}
        </Box>
    )
}

export default BlogList