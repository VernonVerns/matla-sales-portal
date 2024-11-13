import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import {
  setChat,
  setLoading,
  setError,
  updateMessages,
} from "../slices/ChatSlice";
import { db } from "../firebase/firebase";

export const fetchChatById = (chatId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      const chatData = chatSnap.data();
      // Ensure messages array exists
      if (!chatData.messages) {
        chatData.messages = [];
      }
      dispatch(setChat(chatData)); // Dispatch the chat data to Redux store
    } else {
      throw new Error("Chat not found");
    }
  } catch (error) {
    dispatch(setError(error.message)); // Handle errors
  }
};

// Function to listen to chat updates in real-time
export const listenToChatUpdates = (chatId, dispatch) => {
  try {
    const chatRef = doc(db, "chats", chatId);
    onSnapshot(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = { ...snapshot.data(), id: snapshot.id };
        dispatch(setChat(data)); // Dispatch the updated chat data to Redux
      }
    });
  } catch (error) {
    dispatch(setError(error.message)); // Handle any errors from Firestore
  }
};

// Function to update chat with a new message
export const updateChatMessages = async (chatId, message) => {
  try {
    const chatRef = doc(db, "chats", chatId);

    await setDoc(
      chatRef,
      {
        messages: arrayUnion(message), // Add new message to messages array
        dateUpdated: new Date().toISOString(), // Update the dateUpdated field
      },
      { merge: true } // Merges with existing data or creates if not existing
    );

    // Dispatch action to update local Redux store
    // dispatch(updateMessages(message));
  } catch (error) {
    // dispatch(setError(error.message)); // Handle any errors from Firestore
  }
};
