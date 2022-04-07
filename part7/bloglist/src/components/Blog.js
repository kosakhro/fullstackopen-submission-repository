import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, handleRemove, user }) => {
  const [blogView, setBlogView] = useState(false)

  const handleLike = (blog) => {
    const newBlog = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
      user: blog.user,
      id: blog.id
    }
    updateBlog(newBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (blogView === false) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setBlogView(true)}> view</button>
      </div>
    )}
  /*console.log('blog user name: ', blog.user.name)
  console.log('user name: ', user.name)
  console.log('user: ', user)
  console.log('blog user : ', blog.user)*/
  if (blog.user.name === user.name)
  {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setBlogView(false)}> hide</button> <br/>
        {blog.url} <br/>
        {blog.likes} <button onClick={() => handleLike(blog)}> like</button> <br/>
        {blog.user.name} <br/>

        <button onClick={() => handleRemove(blog)}> remove</button>
      </div>)
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setBlogView(false)}> hide</button> <br/>
      {blog.url} <br/>
      {blog.likes} <button onClick={() => handleLike(blog)}> like</button> <br/>
      {blog.user.name}
    </div>)

}

export default Blog
