import BlogForm from './BlogForm'
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

describe('<BlogForm /> test', () => {
  const mockfn = jest.fn()

  const container = render(<BlogForm createBlog={mockfn} />).container
  test('the form calls the event handler it received as props with the right details', () => {
    const inputTitle = container.querySelector('#title-id')
    const inputAuthor = container.querySelector('#author-id')
    const inputUrl = container.querySelector('#url-id')

    const button = screen.getByText('create')

    userEvent.type(inputTitle, 'Titre')
    userEvent.type(inputAuthor, 'Auteur')
    userEvent.type(inputUrl, 'Lien')
    userEvent.click(button)

    expect(mockfn.mock.calls).toHaveLength(1)
  })
})
