const containerStyles = {
  border: "1px solid #ccc",
  padding: "1rem",
};

const titleStyles = {
  fontWeight: "bold",
};

const authorStyles = {
  marginTop: "1rem",
};

const Blog = ({ blog }) => (
  <div style={containerStyles}>
    <h3 style={titleStyles}>{blog.title}</h3>
    <p style={authorStyles}>{blog.author}</p>
  </div>
);

export default Blog;
