import { createSlice } from "@reduxjs/toolkit";

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
    dispatch(setNotification(`You added ${message}`));
    setTimeout(() => dispatch(clearNotification()), second * 1000);
  };
};

export default notificationSlice.reducer;
