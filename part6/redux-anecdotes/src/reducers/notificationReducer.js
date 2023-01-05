import { createSlice } from "@reduxjs/toolkit";

const initialState = ['men'];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducer: {
    notify(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
