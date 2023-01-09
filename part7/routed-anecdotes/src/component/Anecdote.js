import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((n) => n.id === Number(id));

  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes}</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </>
  );
};

export default Anecdote;
