import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      username: 'test_user',
      name: 'test_name'
    }
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
      user: {
        username: 'test_user',
        name: 'test_name'
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

  test('not shown url and likes', () => {
    const elementUrl = container.querySelector('.url')
    const elementLikes = container.querySelector('.likes')

    expect(elementUrl).not.toBeVisible()
    expect(elementLikes).not.toBeVisible()
  })

  test('after clicking on view, the url and likes are displayed', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    const elementUrl = container.querySelector('.url')
    expect(elementUrl).toBeVisible()
    const elementLikes = container.querySelector('.likes')
    expect(elementLikes).toBeVisible()
  })
})
