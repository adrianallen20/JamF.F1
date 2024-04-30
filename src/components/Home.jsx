import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from "../assets/jflogo.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import midnights1 from "../assets/midnights1.mp3";
const Home = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("likedUsers");

        console.log("user signed out");
      })
      .catch((err) => {
        console.log("err user signOut ", err);
      });
  };

  return (
    <>
      {" "}
      <div className="full-page-background">
        <div className="navbar">
          <div className="nav-link">
            <div className="logo">
              <img src={logoImage} alt="Logo" className="logo-image" />
            </div>
            <Link to="/">Home</Link>
            <Link to="/jam">Jam</Link>
            <Link to="/fuses">Fuses</Link>
            <Link to="/profile">Profile</Link>
          </div>

          {user ? (
            <button className="signout-button" onClick={signOut}>
              Sign out
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
