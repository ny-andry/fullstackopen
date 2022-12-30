import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = { title: newTitle, author: newAuthor, url: newUrl, likes: 0 }
    createBlog(blog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2> Add a blog </h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
            id="title-id"
            placeholder="title of the blog"
          />
        </div>

        <div>
          Author
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
            id="author-id"
            placeholder="author of the blog"
          />
        </div>

        <div>
          Url
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
            id="url-id"
            placeholder="url of the blog"
          />
        </div>
        <button id="create-id" type="submit">
          create
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm
