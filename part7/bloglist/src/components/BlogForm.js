import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    })
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="Title">Title:</label>
          <input
            id='title'
            value={newBlog}
            onChange={handleBlogChange}
            name="Title"
          />
        </div>
        <div>
          <label htmlFor="Author">Author:</label>
          <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
            name="Author"
          />
        </div>
        <div>
          <label htmlFor="Url">Url:</label>
          <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
            name="Url"
          />
        </div>
        <button id="create-button" type="submit">
            create</button>
      </form>
    </div>
  )
}

export default BlogForm