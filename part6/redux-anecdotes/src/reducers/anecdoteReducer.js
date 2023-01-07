import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const votedAnecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, AppendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotesService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export default anecdoteSlice.reducer;
