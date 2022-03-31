import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
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


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      url: newUrl, 
      author: newAuthor, 
      likes: 0,
      title: newBlog,

    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setErrorMessage (`a new blog ${newBlog} by ${newAuthor} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.concat(returnedBlog))
        console.log('blogs: ', blogs)
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
      })
      .catch(error => {
        setErrorMessage (`wrong format, please fill all compulsory data`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
    console.log('new blogs: ', newBlog)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
    console.log('new author: ', newAuthor)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
    console.log('new url: ', newUrl)
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:<input
       type="text"
       value={newBlog}
       name="Title"
        onChange={handleBlogChange}
      />
      </div>
      <div>
        author:<input
        type="text"
        value={newAuthor}
        name="Author"
        onChange={handleAuthorChange}
      />
      </div>
      <div>
        url:<input
        type="text"
        value={newUrl}
        name="Url"
        onChange={handleUrlChange}
      />
      </div>
      <button type="submit">create</button>
    </form>  
  )  




/*
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
      }





      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )*/



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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )


}

export default App