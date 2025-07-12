import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,

  reducers: {
    adToken: (state, action) => action.payload,
    deleteToken: (state, action) => null,
  },
});

export const { adToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
