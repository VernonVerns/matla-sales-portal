import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: "dashboard"
};

const globalSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        changeTab(state, action) {
          state.tab = action.payload;
        },
    },
});

export const globalActions = globalSlice.actions;
export default globalSlice;