import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }

    const loggedUserJSON = window.localStorage.getItem('blogapp')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    fetchBlogs()
  }, [])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('blogapp', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogapp')

    setUser()
    setMessage('Logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs([...blogs, newBlog])
      setMessage(`${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(`${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog, id) => {
    const newBlog = await blogService.update(blog, id)
    const updatedBlogs = [...blogs].map((x) => (x.id !== id ? x : newBlog))
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    setBlogs([...blogs].filter((blog) => blog.id !== id))
  }

  return (
    <div>
      <div>
        <Notification message={message} />
        {!user? (
          <LoginForm
            handleLogin={handleLogin}
            handlePassword={handlePassword}
            handleUsername={handleUsername}
            username={username}
            password={password}
          />
        ) : (
          <>
            <div>
              <p>{user.name} logged-in </p>
              <button onClick={handleLogout}>Log Out</button>
            </div>
            <div>
              <div>
                <Togglable buttonLabel="new blog">
                  <BlogForm createBlog={createBlog} />
                </Togglable>
              </div>
              <h2>blogs</h2>
              {blogs.map((blog) => (
                <Blog
                  key={blog.title}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  user={user}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
