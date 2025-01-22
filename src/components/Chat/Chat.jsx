import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

function Chat() {
  //backend connection
  const socket = io.connect("http://localhost:4000");

  const [message, setMessage] = useState("");

  //rename later
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //incoming messages listener
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]); // ? research this syntax
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", {
        text: message,
        sender: "gyb",
      });
      // clear message state
      setMessage("");
    }
  };
  return (
    <div className="container">
      <h2 className="head">Chat App</h2>
      <div className="wrap-chat">
        {messages.map((msg, index) => (
          <p key={msg.sender}>
            <span>{msg.sender}</span>: {msg.text}
          </p>
        ))}
      </div>

      <div className="wrap-input">
        <input
          className="input"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="send-btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
