import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      const newUser = {
        id: Date.now(),
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        createdAt: new Date().toISOString(),
        status: "active",
      };
      state.users.push(newUser);
      state.error = null;
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = "Credenciales inválidas";
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearError, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
