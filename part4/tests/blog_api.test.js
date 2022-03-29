const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('bloom', 10)
    const user = new User({ username: 'robert', passwordHash })

    await user.save()
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs are identified by id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(blog => blog.id)

    expect(contents).toBeDefined()
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {

      const users = await helper.usersInDb()

      const request = await api
        .post('/api/login')
        .send({
          username: 'robert',
          password: 'bloom'
        })

      const token = request.body.token

      const newBlog = {
        title: 'Hiidenkiven puutarhassa',
        author: 'Minna Heinonen',
        url: 'https://hiidenkivenpuutarhassa.blogspot.com/',
        likes: 205,
        userId: users[0].id
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(blog => blog.title)
      expect(contents).toContainEqual('Hiidenkiven puutarhassa')
    })

    test('a blog without likes adding ', async () => {

      const users = await helper.usersInDb()

      const request = await api
        .post('/api/login')
        .send({
          username: 'robert',
          password: 'bloom'
        })

      const token = request.body.token

      const newBlog = {
        title: 'Trio MiuMau ja herra Nilsson',
        author: 'Elena Kivinen',
        url: 'https://www.blogit.fi/trio-miumau-ja-herra-nilsson',
        userId: users[0].id
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const contents = blogsAtEnd.find((blog) => blog.id === response.body.id)
      expect(contents.likes).toEqual(0)
    })

    test('blog without url is not added', async () => {
      const users = await helper.usersInDb()

      const request = await api
        .post('/api/login')
        .send({
          username: 'robert',
          password: 'bloom'
        })

      const token = request.body.token

      const newBlog = {
        title: 'Trio MiuMau ja herra Nilsson',
        author: 'Elena Kivinen',
        //url: '123',
        userId: users[0].id
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog without token is not added ', async () => {

      const users = await helper.usersInDb()

      const newBlog = {
        title: 'Hiidenkiven puutarhassa',
        author: 'Minna Heinonen',
        url: 'https://hiidenkivenpuutarhassa.blogspot.com/',
        likes: 205,
        userId: users[0].id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

  })

  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {

      const users = await helper.usersInDb()

      const request = await api
        .post('/api/login')
        .send({
          username: 'robert',
          password: 'bloom'
        })

      const token = request.body.token

      const newBlog = {
        title: 'Trio MiuMau ja herra Nilsson',
        author: 'Elena Kivinen',
        url: 'https://www.blogit.fi/trio-miumau-ja-herra-nilsson',
        userId: users[0].id
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[blogsAtStart.length-1]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length
      )

      const contents = blogsAtEnd.map(blog => blog.id)

      expect(contents).not.toContain(blogToDelete.id)
    })
  })

  describe('adition of a blog', () => {
    test('a blog can be edited', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToEdit = blogsAtStart[0]
      blogToEdit.likes = 45454

      await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(blogToEdit)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd[0].likes).toEqual(blogToEdit.likes)
    })
  })

  describe('when there is initially one user at db', () => {

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'robert',
        name: 'slkhdfklsdf',
        password: 'kjkljflks',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ro',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('is shorter than the minimum allowed length')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user without username is not added', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Superuser',
        password: 'salainen'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('Path `username` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'robert2',
        name: 'Superuser',
        password: 'sa',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password is missing or too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user without password is not added', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'robert3',
        name: 'Superuser'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password is missing or too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})