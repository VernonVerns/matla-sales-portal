import { createSlice } from "@reduxjs/toolkit";
import { signIn, logout } from "../api/Auth";

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      // Save user to localStorage on login
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      // Remove user from localStorage on logout
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = authSlice.actions;

export const signInUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const user = await signIn(email, password);
    dispatch(setUser(user)); // Will also save to localStorage
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await logout();
    dispatch(clearUser());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice;
