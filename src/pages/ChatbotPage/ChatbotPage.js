// import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./ChatbotPage.css";

export default function ChatbotPage() {
  return (
    <>
      <Header />
      <ChatBody />
    </>
  );
}

function Header() {
  // const navigate = useNavigate();
  return (
    <header className="csv-header">
      <div className="logo">
        <p>Logo</p>
      </div>

      <div className="header-links">
        <a href="/HomePage">Home</a>
        <a href="/store">Store</a>
        <a href="/chatbot">Chatbot</a>
        <a href="/upload">Upload File</a>
      </div>

      <div className="Head-right">
        <div className="profile">
          <span className="material-symbols-rounded head-icon">person</span>
          <a href="/">Profile</a>
        </div>
        <button className="logout-btn">Log Out</button>
      </div>
    </header>
  );
}
function ChatBody() {
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Hi there! I’m Kimmy, your AI assistant. How can I help you today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const sendMessage = () => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { sender: "User", text: userInput }]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "AI",
            text: "I'm here to help! What do you need assistance with?",
          },
        ]);
      }, 1000);

      setUserInput("");
    }
  };

  return (
    <div className="chatpage-container">
      <div className="chat-container">
        <div>
          <h2 className="header-title">Hello 👋 Welcome to (name)!</h2>
          <p className="header-subtitle">
            Feel free to ask me about browsing products, recommendations, or
            shop management!
          </p>
        </div>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "AI" ? "bot-message" : "user-message"
              }`}
              ref={index === messages.length - 1 ? lastMessageRef : null}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Say what you want and Kimmy will surprise you..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
