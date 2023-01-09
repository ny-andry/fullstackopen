import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (e) => {
    content.onChange(e, true);
    author.onChange(e, true);
    info.onChange(e, true);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="button" onClick={handleSubmit}>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
