import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

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

  const handleTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthor = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrl = (event) => {
    setNewUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem("blogapp", JSON.stringify(user));
      blogService.setToken(user.token);
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

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      });
      setErrorMessage(`${newTitle} by ${newAuthor} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    } catch (error) {
      setErrorMessage(`${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  return (
    <div>
      <div>
        <Notification message={errorMessage} />
        {user === null ? (
          loginForm()
        ) : (
          <>
            <div>
              <p>{user.name} logged-in </p>
              <button onClick={handleLogout}>Log Out</button>
            </div>
            <div>
              <div>
                <BlogForm
                  title={newTitle}
                  author={newAuthor}
                  url={newUrl}
                  handleTitle={handleTitle}
                  handleAuthor={handleAuthor}
                  handleUrl={handleUrl}
                  handleSubmit={handleSubmit}
                />
              </div>
              <h2>blogs</h2>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
