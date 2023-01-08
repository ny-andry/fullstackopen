import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = [...useSelector((state) => state.anecdotes)].sort(
    (a, b) => b.votes - a.votes
  );
  const filter = useSelector((state) => state.filter);

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote));
    dispatch(notify(anecdote.content, 5));
  };
  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
