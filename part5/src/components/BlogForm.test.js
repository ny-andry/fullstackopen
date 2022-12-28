import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> test', async () => {
  const mockfn = jest.fn()
  const user = userEvent.setup()

  const newBlog = {
    title: 'Title blog',
    author: 'Author',
    url: 'mysite.com'
  }

  render(<BlogForm createBlog={mockfn} />)

  const titleInput = document.querySelector('#title-id')
  const authorInput = document.querySelector('#author-id')
  const urlInput = document.querySelector('#url-id')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(submitButton)

  expect(mockfn.mock.calls).toHaveLength(1)
  expect(mockfn.mock.calls[0][0]).toEqual(newBlog)
})
