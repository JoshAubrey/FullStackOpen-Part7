import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Redirect //Link, useParams, useHistory, useRouteMatch
} from 'react-router-dom'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Menu from './components/Menu'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog, likeBlog, commentBlog, deleteBlog } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setCurrentUser, clearCurrentUser } from "./reducers/currentUserReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.currentUser )
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5, true))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(clearCurrentUser())
  }

  const handleCreateBlog = (blogObject) => {
    try {
      dispatch(newBlog(blogObject))
      dispatch(setNotification(`Added '${blogObject.title}'`, 5))
    }
    catch (error) {
      console.log(error.response.data.error)
      dispatch(setNotification(error.response.data.error.toString(), 5, true))
    }
  }

  const handleLikeBlog = (blogObject) => {
    try {
      dispatch(likeBlog(blogObject))
      dispatch(setNotification(`Liked '${blogObject.title}'`, 5))
    }
    catch (error) {
      console.log(error.response.data.error)
      dispatch(setNotification(error.response.data.error.toString(), 5, true))
    }
  }

  const handleCommentBlog = (blogObject, comment) => {
    try {
      dispatch(commentBlog(blogObject, comment))
      dispatch(setNotification(`Commented '${blogObject.title}'`, 5))
    }
    catch (error) {
      console.log(error.response.data.error)
      dispatch(setNotification(error.response.data.error.toString(), 5, true))
    }
  }

  const handleDeleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    if(window.confirm(`Delete ${blog.title} ?`)){
      try {
        dispatch(deleteBlog(id))
        dispatch(setNotification(`Deleted '${blog.title}'`, 5))
      }
      catch (error) {
        console.log(error.response.data.error)
        dispatch(setNotification(error.response.data.error.toString(), 5, true))
      }
    }
  }

  const loggedIn = () => (
    <p>
      {currentUser.name} logged-in <button onClick={handleLogout}>logout</button>
    </p>
  )

  return (
    <Router>
      <h1>blogs</h1>

      {currentUser ? <Menu/> : '' }

      {currentUser ? loggedIn() : ''}

      <Notification/>

      <Switch>
        <Route path='/login'>
          {currentUser ? 
            <Redirect to='/'/> : 
            <LoginForm
              handleLogin={handleLogin} 
              username={username}
              password={password} 
              setUsername={setUsername}
              setPassword={setPassword}
            />          
          }
        </Route>
        <Route path='/users/:id'>
          {currentUser ? <UserDetails users={users} blogs={blogs}/> : <Redirect to='/login'/> }
        </Route>
        <Route path='/users'>
          {currentUser ? <UserList users={users}/> : <Redirect to='/login'/> }
        </Route>
        <Route path='/blogs/:id'>
          {currentUser ? 
          <BlogDetails 
            blogs={blogs} 
            currentUser={currentUser}
            handleLikeBlog={handleLikeBlog}
            handleCommentBlog={handleCommentBlog}
            handleDeleteBlog={handleDeleteBlog} 
          /> : 
          <Redirect to='/login'/> }
        </Route>
        <Route path='/'>
          {currentUser ?
            <BlogList 
              blogs={blogs} 
              currentUser={currentUser} 
              handleCreateBlog={handleCreateBlog} 
              handleLikeBlog={handleLikeBlog}
              handleDeleteBlog={handleDeleteBlog}
            /> : 
            <Redirect to='/login'/>
          }
        </Route>  
      </Switch>
    </Router>
  )
}

// "username": "Groot",
// "password": "groot"
// "username": "mluukkai",
// "password": "salainen"

export default App