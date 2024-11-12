import { createSlice } from "@reduxjs/toolkit";

// Initial state for the chat
const initialState = {
  chat: null,
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Create the slice
const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateMessages: (state, action) => {
      if (state.chat) {
        state.chat.messages.push(action.payload);
        state.chat.dateUpdated = new Date().toISOString(); // Update the dateUpdated
      }
    },
  },
});

export const { setChat, setLoading, setError, updateMessages } =
  chatSlice.actions;

export default chatSlice;
