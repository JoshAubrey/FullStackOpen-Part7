import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG': {
      return [...state, action.data]
    }
    case 'LIKE_BLOG': {
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = { 
        ...blogToChange, 
        likes: blogToChange.likes + 1 
      }
      return state
              .map(blog => blog.id !== id ? blog : changedBlog )
              .sort((a,b) => b.likes - a.likes)
    }
    case 'COMMENT_BLOG': {
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = { 
        ...blogToChange, 
        comments: action.data.comments 
      }
      return state
              .map(blog => blog.id !== id ? blog : changedBlog )
              .sort((a,b) => b.likes - a.likes)
    }
    case 'DELETE_BLOG': {
      const id = action.data
      return state.filter(b => b.id !== id)
    }
    case 'INIT_BLOGS': {
      return action.data
    }
    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.sort((a,b) => b.likes - a.likes),
    })
  }
}

export const newBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, {...blog, likes: blog.likes + 1})
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, {...blog, comments: blog.comments.concat(comment)})
    dispatch({
      type: 'COMMENT_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export default blogsReducer