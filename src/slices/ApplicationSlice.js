import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setApplications, setLoading, setError } =
  applicationSlice.actions;

export default applicationSlice;
