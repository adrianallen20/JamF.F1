import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from "../assets/jflogo.png";
import { sendMessage, fetchMessages } from "../modules/MessageFunctions";

const Fuses = () => {
  const { user } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("likedUsers");
      })
      .catch((err) => {
        console.log("err user signOut ", err);
      });
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        <Link to="/">Home</Link>
        <Link to="/jam">Jam</Link>
        <Link to="/fuses">Fuses</Link>
        <Link to="/profile">Profile</Link>
        {user ? (
          <button className="signout-button" onClick={signOut}>
            Sign out
          </button>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
      <div className="preview-box">
        <p>View Profile</p>
      </div>
      <div className="chat-section">
        <div className="match-list">
          <div>Match with User ID: </div>
        </div>
        <div className="chat-area">
          <div className="chat-messages">
            <p></p>
          </div>
          <div className="message-input-area">
            <input className="message-box" placeholder="Type your message..." />
            <button className="send-message">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fuses;
