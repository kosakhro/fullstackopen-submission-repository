import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  //const [newAuthor, setNewAuthor] = useState('')
  //const [newUrl, setNewUrl] = useState('')
  //const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage('You are successfully loged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleRemove = async (blog) => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      try {
        await blogService
          .remove(blog.id)
        setErrorMessage (`${blog.title} was removed`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== blog.id ))

      }
      catch (exception) {
        setErrorMessage (`Information of ${blog.title} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }

    }
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setErrorMessage (`a new blog ${blogObject.title} by ${blogObject.author} was added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        returnedBlog.user=user
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(() => {
        setErrorMessage ('wrong format, please fill all compulsory data')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
  }

  const updateBlog = async (blog) => {
    await blogService
      .update(blog.id, blog)
    const index = blogs.findIndex((blogToUpdate) => blogToUpdate.id === blog.id)
    const updatedBlogs = [...blogs]
    updatedBlogs[index] = blog
    setBlogs(updatedBlogs)
  }



  const loginForm = () => (
    <Togglable buttonLabel="log in" buttonLabel2="cancel">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" buttonLabel2="cancel" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable >
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}

      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}> logout</button></p>
        {blogForm()}
      </div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} handleRemove={handleRemove} user={user}/>
      )}
    </div>
  )


}

export default App