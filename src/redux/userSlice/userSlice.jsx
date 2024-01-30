import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    allError: (state) => {
      state.error = null;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut(state) {
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut, allError } =
  userSlice.actions;
export default userSlice.reducer;
