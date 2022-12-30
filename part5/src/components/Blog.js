import Togglable from './Togglable'

const containerStyles = {
  border: '1px solid #ccc',
  padding: '1rem'
}

const titleStyles = {
  fontWeight: 'bold'
}

const elementStyles = {
  color: 'grey'
}

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const handleUpdate = () => {
    const blogObj = { ...blog, likes: blog.likes + 1 }
    updateBlog(blogObj, blog.id)
  }

  const handleRemove = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={containerStyles}>
      <h3 style={titleStyles} className="title">
        {blog.title} by {blog.author}
      </h3>
      <Togglable buttonLabel="view">
        <p style={elementStyles} className="url">
          {blog.url}
        </p>
        <p style={elementStyles} className="likes">
          likes: {blog.likes}{' '}
          <button id="like" onClick={handleUpdate}>
            like
          </button>
        </p>
        <p>created by {blog.user.username}</p>
        <p>
          {user && user.username === blog.user.username ? (
            <button id="remove" onClick={handleRemove}>
              remove
            </button>
          ) : null}
        </p>
      </Togglable>
    </div>
  )
}

export default Blog
