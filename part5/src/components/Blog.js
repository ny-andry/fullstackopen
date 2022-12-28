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
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
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
      <h3 style={titleStyles}>
        {blog.title} by {blog.author}
      </h3>
      <Togglable buttonLabel="view">
        <p style={elementStyles}>{blog.url}</p>
        <p style={elementStyles}>
          likes: {blog.likes} <button onClick={handleUpdate}> like </button>
        </p>
        <p>
          {user && user.username === blog.user.username ? (
            <button onClick={handleRemove}>remove</button>
          ) : null}
        </p>
      </Togglable>
    </div>
  )
}

export default Blog
