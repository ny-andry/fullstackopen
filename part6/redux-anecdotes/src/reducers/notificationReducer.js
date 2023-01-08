import { createSlice } from "@reduxjs/toolkit";

let timeout = -1;
const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return state;
    },
    clearNotification(state) {
      state = "";
      return state;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const notify = (message, second) => {
  return (dispatch) => {
    if (timeout >= 0) {
      clearTimeout(timeout);
      timeout = -1;
    }
    dispatch(setNotification(`You added ${message}`));
    timeout = setTimeout(() => dispatch(clearNotification()), second * 1000);
  };
};

export default notificationSlice.reducer;
