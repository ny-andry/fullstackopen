import Togglable from "./Togglable";

const containerStyles = {
  border: "1px solid #ccc",
  padding: "1rem",
};

const titleStyles = {
  fontWeight: "bold",
};

const elementStyles = {
  color: "grey",
};

const Blog = ({ blog }) => (
  <div style={containerStyles}>
    <h3 style={titleStyles}>{blog.title}</h3>
    <Togglable buttonLabel="view">
      <p style={elementStyles}>{blog.url}</p>
      <p style={elementStyles}>
        likes: {blog.likes} <button> like </button>
      </p>
      <p style={elementStyles}>{blog.author}</p>
    </Togglable>
  </div>
);

export default Blog;
