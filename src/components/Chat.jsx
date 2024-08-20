//CHAT.JSX INNAN INVITES OCH HANTERING AV FLER KONVERSATIONER

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import DOMPurify from "dompurify";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";
import SideNav from "./SideNav";
import styles from "../styles/Style.module.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const { token, user } = useAuth();

  // hämta meddelanden
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://chatify-api.up.railway.app/messages",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Använd token från AuthContext
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Error fetching messages");
      }
    };
    if (token) {
      fetchMessages();
    }
    fetchMessages();
  }, [token, newMessage]); // Beroende på token & nya meddelanden

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Ny funktion för att skapa meddelanden
  const handleSendMessage = async () => {
    // Sanitize the message
    const sanitizedMessage = DOMPurify.sanitize(newMessage);
    const conversationId = uuidv4();

    try {
      // Skicka POST-anrop för att skapa ett nytt meddelande
      const response = await fetch(
        "https://chatify-api.up.railway.app/messages",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Använd token från useAuth
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: sanitizedMessage, conversationId }), // Skicka meddelandets innehåll
        }
      );

      if (response.ok) {
        const newMsg = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setNewMessage(""); // Rensa inputfältet
      } else {
        setError("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error sending message");
    }
  };

  //radela meddelande
  const handleDeleteMessage = async (msgID) => {
    console.log("Attempting to delete message with ID:", msgID);

    try {
      const response = await fetch(
        `https://chatify-api.up.railway.app/messages/${msgID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Använd token från useAuth
          },
        }
      );

      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== msgID)
        );
        toast.success("Message deleted successfully!"); // Show success toast
      } else {
        toast.error("Failed to delete message"); // Show error toast
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Error deleting message");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className="header">
        <SideNav /> {/* Lägg till SideNav här för att alltid visa den */}
      </div>
      <div className="chat-page">
        <h1>Chat</h1>
        <img
          src={user.avatar}
          alt="User Avatar"
          className={styles.userAvatar}
        />
        <p>User: {user.user}</p>
        <div className={styles.messagesList}>
          {messages.map((msg) => {
            return (
              <div
                key={msg.id}
                className={`${styles.message} ${
                  msg.userId === user.userId ? "right" : "left"
                }`}
              >
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className={styles.userAvatar}
                />
                <div className={styles.messageContent}>
                  <p className={styles.username}>{user.user}</p>
                  <p>{msg.text}</p>
                  <button
                    className={styles.btnDeleteMessage}
                    onClick={() => handleDeleteMessage(msg.id)}
                  >
                    ❌
                  </button>
                </div>{" "}
              </div>
            );
          })}
        </div>

        <div className={styles.newMessage}>
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <div className="success-error-message">
          <p className="error-message">{error}</p>
        </div>
      </div>
      <ToastContainer />{" "}
      {/* Add ToastContainer to render toast notifications */}
    </div>
  );
};

export default Chat;
