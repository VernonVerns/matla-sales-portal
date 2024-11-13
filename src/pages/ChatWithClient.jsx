import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  fetchChatById,
  listenToChatUpdates,
  updateChatMessages,
} from "../api/Chat";
import { setLoading, setError } from "../slices/ChatSlice";
import { quickMessages } from "../Contants";
import moment from "moment";
import { sendDynamicMessage } from "../api/WhatsApp";

const ChatWithClient = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  // Get chat data from Redux store
  const chat = useSelector((state) => state.chats.chat);
  const chatStatus = useSelector((state) => state.chats.status);
  const error = useSelector((state) => state.chats.error);

  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const match = fullUrl.match(/chat_with\/([^/?#]+)/);

    if (match && match[1]) {
      setChatId(match[1]);
      console.log("Chat ID:", match[1]);
    } else {
      console.error("Chat ID not found in URL");
    }
  }, []); // Run only once when component mounts

  useEffect(() => {
    if (chatId) {
      // Fetch chat data using chatId
      listenToChatUpdates(chatId, dispatch); // Listen to real-time updates for the chat
    }
  }, [chatId, dispatch]); // Re-run when chatId changes

  // Send message function
  const handleSendMessage = async () => {
    if (message.trim()) {
      // Avoid appending the same message twice
      const newMessage = {
        text: message,
        from: "agent",
        timestamp: new Date().toISOString(),
      };
      setMessage("");

      // Update Redux state with new message
      await updateChatMessages(chatId, newMessage);
      await sendDynamicMessage(chatId, newMessage.text); // Send to WhatsApp
      // Clear message input after sending
    }
  };

  // Handle quick replies
  const handleUseQuickMessage = (msg) => {
    setMessage(msg); // Pre-fill the message input with the selected quick message
  };

  // Conditional rendering based on loading or error status
  if (chatStatus === "loading") {
    return <div>Loading chat...</div>;
  }

  if (chatStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chat-with-client">
      <div className="chat-header">
        <h4>Chat with Client</h4>
      </div>

      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="msgs-container">
            {chat?.messages?.map((msg, index) => (
              <div
                className={`chat-msg ${msg.from === "client" ? "" : "from"}`}
                key={index}
              >
                <div className="chat-msg-profile">
                  <div className="chat-msg-date">
                    {moment(msg.timestamp)
                      .add(2, "hours")
                      .format("YYYY-MM-DD/HH:mm:ss")}
                  </div>
                </div>
                <div className="chat-msg-content">
                  <div className="chat-msg-text">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="textbox-container">
            <textarea
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Type a message"
            />
            <div className="textbox-btns">
              <button type="button" className="attach-file-btn">
                <AttachFileIcon />
              </button>
              <button
                type="button"
                className="send-msg-btn"
                onClick={handleSendMessage}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="quick-msgs-container">
          <h4>Quick replies</h4>
          {quickMessages.map((quickMsg) => (
            <div
              key={quickMsg.id}
              className="quick-msg"
              onClick={() => handleUseQuickMessage(quickMsg.message)}
            >
              {quickMsg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWithClient;
