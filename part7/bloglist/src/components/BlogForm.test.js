import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('form calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('[name="Title"]')
  const author = component.container.querySelector('[name="Author"]')
  const url = component.container.querySelector('[name="Url"]')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'blogs title' }
  })
  fireEvent.change(author, {
    target: { value: 'blogs author' }
  })
  fireEvent.change(url, {
    target: { value: 'blogs url' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blogs title')
  expect(createBlog.mock.calls[0][0].author).toBe('blogs author')
  expect(createBlog.mock.calls[0][0].url).toBe('blogs url')
})