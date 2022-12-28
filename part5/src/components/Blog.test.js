import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> test', () => {
  let updateBlog
  let removeBlog
  let user
  let blog
  let container

  beforeEach(() => {
    updateBlog = jest.fn()
    removeBlog = jest.fn()
    user = {
      username: 'test_user'
    }
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
      user: {
        username: 'test_user'
      }
    }
    container = render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
        user={user}
      />
    ).container
  })

  test('renders the blog title and author', () => {
    expect(container.querySelector('.title').textContent).toContain(
      'Test Blog by Test Author'
    )
  })

  test('does not render the url or number of likes by default', () => {
    expect(container.querySelector('.url')).toBeNull()
    expect(container.querySelector('.likes')).toBeNull()
  })
})
