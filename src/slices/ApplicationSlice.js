import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  openApplication: null,
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
    setOpenApplication: (state, action) => {
      state.openApplication = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setApplications, setLoading, setError, setOpenApplication } =
  applicationSlice.actions;

export default applicationSlice;
