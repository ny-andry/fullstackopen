import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/user'

import './index.css'

const byLikes = (a, b) => b.likes - a.likes

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort(byLikes)
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      userService.setUser(user)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser()
    userService.clearUser()
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
    setBlogs(updatedBlogs.sort(byLikes))
  }

  // const removeBlog = async (id) => {
  //   await blogService.remove(id)
  //   setBlogs([...blogs].filter((blog) => blog.id !== id))
  // }

  const removeBlog = async (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }
    await blogService.remove(id)
    const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes)
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      <div>
        <Notification message={message} />
        {!user ? (
          <LoginForm onLogin={login} />
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
