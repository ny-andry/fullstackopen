import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogapp");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("blogapp", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("blogapp");
    setUser(undefined);
    window.location.reload();
  };

  const createBlog = (blog) => {
    try {
      blogService.create(blog);
      setErrorMessage(`${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setBlogs([...blogs, blog]);
    } catch (error) {
      setErrorMessage(`${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateBlog = (blog, id) => {
    blogService.update(blog, id);
    // needs to add setblogs that rerenders it proprely.
  };

  return (
    <div>
      <div>
        <Notification message={errorMessage} />
        {user === null ? (
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
                <Blog key={blog.title} blog={blog} updateBlog={updateBlog} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
