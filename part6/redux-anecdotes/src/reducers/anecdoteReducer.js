import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload.id;
      const votedAnecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotesService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const object = await anecdotesService.create(content);
    dispatch(appendAnecdote(object));
  };
};

export const updateAnecdote = (content) => {
  return async (dispatch) => {
    const object = await anecdotesService.update(content, content.id);
    dispatch(voteAnecdote(object));
  };
};

export default anecdoteSlice.reducer;
