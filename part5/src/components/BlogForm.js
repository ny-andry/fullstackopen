const BlogForm = ({
  handleSubmit,
  title,
  handleTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
}) => {
  return (
    <>
      <h2> Add a blog </h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>

        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>

        <div>
          Url
          <input type="text" value={url} name="Url" onChange={handleUrl} />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
