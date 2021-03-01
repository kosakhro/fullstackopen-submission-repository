const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('when there is initially some notes saved', () => {
  test('blogs are returned in json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs return with unique id ', async () => {
    const response = await api.get('/api/blogs')
    response.body.map((blog) => expect(blog.id).toBeDefined())
  })
})

describe('addition of a new note', () => {

  test('a valid blog can be added and total number of blogs increased by 1 ', async () => {
    await api
      .post('/api/blogs')
      .send(helper.oneBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('missed likes property converted to 0 likes', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogMissedLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const blog = blogsAtEnd.find((blog) => blog.id === response.body.id)
    expect(blog.likes).toEqual(0)
  })


  test('note without title is not added', async () => {

    await api
      .post('/api/blogs')
      .send(helper.nonExistingTitle)
      .expect(400)
    const notesAtEnd = await api.get('/api/blogs')
    expect(notesAtEnd.body).toHaveLength(helper.initialBlogs.length)
  })

  test('note without url is not added', async () => {

    await api
      .post('/api/blogs')
      .send(helper.nonExistingUrl)
      .expect(400)
    const notesAtEnd = await api.get('/api/blogs')
    expect(notesAtEnd.body).toHaveLength(helper.initialBlogs.length)
  })

})

describe('deletion and updating of a note', () => {

  test('a note can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('add more likes to a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const likesToUpdate = blogsAtStart[0].likes
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes += 42

    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(blogToUpdate)
      .expect(200)

    expect(likesToUpdate + 42 ).toBe(blogToUpdate.likes)
  })

})


afterAll(() => {
  mongoose.connection.close()
})