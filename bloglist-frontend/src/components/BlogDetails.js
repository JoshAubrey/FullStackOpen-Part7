import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const BlogDetails = ({blogs, handleLikeBlog, handleCommentBlog, handleDeleteBlog, currentUser}) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)
    const [newComment, setNewComment] = useState('')
    if (!blog) return null
    const showDelete = { display: currentUser.username === blog.user.username ? '' : 'none' }
  
    const handleCommentChange = (event) => {
      setNewComment(event.target.value)
    }

    const addComment = (event) => {
        event.preventDefault()
        handleCommentBlog(blog, newComment)
    
        setNewComment('')
      }

    return (
        <div>
            <h2>
                {blog.title} by {blog.author}
            </h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                Likes: <span id='likes'>{blog.likes}</span> <button onClick={() => handleLikeBlog(blog)}>like</button>
            </div>
            <div>
                Submitted by: {blog.user.name}
            </div>
            <div style = {showDelete}>
                <button onClick={() => handleDeleteBlog(blog.id)}>delete</button>
            </div>
            <h3>
                comments
            </h3>
            <form onSubmit={addComment}>
                <div>
                    <input value={newComment} onChange={handleCommentChange} id='title'/>
                    <button type="submit">add comment</button>
                </div>
            </form>
            <ul>
                {blog.comments.map((comment, index) => 
                    <li key={index} >
                        {comment}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default BlogDetails