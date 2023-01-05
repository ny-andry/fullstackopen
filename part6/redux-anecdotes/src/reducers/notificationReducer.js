import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setNotification: (state, action) => {
      state = action.payload;
      return state;
    },
    clearNotification: (state) => {
      state = "";
      return state;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification, clearNotification } = notificationSlice.actions;
