const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Buratino',
    author: 'Aleksey Tolstoi',
    url: 'https://en.wikipedia.org/wiki/Buratino',
    likes: 2
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoi',
    url: 'https://en.wikipedia.org/wiki/War_and_Peace',
    likes: 3
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    url: 'https://en.wikipedia.org/wiki/Crime_and_Punishment',
    likes: 42
  },
  {
    title: 'Sonechka',
    author: 'Lyudmila Ulitskaya',
    url: 'https://en.wikipedia.org/wiki/Sonechka',
    likes: 0
  }
]


const oneBlog = {
  title: 'Crime and Punishment',
  author: 'Fyodor Dostoevsky',
  url: 'https://en.wikipedia.org/wiki/Crime_and_Punishment',
  likes: 42
}


const blogMissedLikes = {
  title: 'Crime and Punishment',
  author: 'Fyodor Dostoevsky',
  url: 'https://en.wikipedia.org/wiki/Crime_and_Punishment',
}



const nonExistingTitle = {
  author: 'Fyodor Dostoevsky',
  url: 'https://en.wikipedia.org/wiki/Crime_and_Punishment',
  likes: 7
}

const nonExistingUrl = {
  author: 'Fyodor Dostoevsky',
  title: 'The Idiot',
  likes: 0
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingTitle, nonExistingUrl, blogsInDb, oneBlog, blogMissedLikes
}
