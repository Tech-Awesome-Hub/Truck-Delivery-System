import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: null,
  csrfToken: null,
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    logout: (state) => {
      state.authToken = null;
      state.csrfToken = null;
      state.userType = null;
    },
  },
});

export const { setAuthToken, setCsrfToken, setUserType, logout } = authSlice.actions;
export default authSlice.reducer;
