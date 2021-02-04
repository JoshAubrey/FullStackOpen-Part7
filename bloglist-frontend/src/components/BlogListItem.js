import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogListItem = ({ blog, handleLikeBlog, handleDeleteBlog, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const showDelete = { display: currentUser.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='detailsHidden' style={hideWhenVisible}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} <button onClick={() => setDetailsVisible(true)}>show</button>
      </div>
      <div className='detailsShown' style={showWhenVisible}>
        <div>
          {blog.title} by {blog.author} <button onClick={() => setDetailsVisible(false)}>hide</button>
        </div>
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
      </div>
    </div>
  )
}

export default BlogListItem
