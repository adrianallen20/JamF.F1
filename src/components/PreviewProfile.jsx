import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from "../assets/jflogo.png";
import { sculptureList } from "./data.js";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ReactPlayer from "react-player";

import { SocialIcon } from "react-social-icons";

const PreviewProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [selectedRoles, setSelectedRoles] = useState({
    Singer: false,
    Rapper: false,
    Producer: false,
    Instrumentalist: false,
  });
  const [selectedSkills, setSelectedSkills] = useState({
    Guitar: false,
    BassGuitar: false,
    Piano: false,
    Drums: false,
  });
  const [skills, setSkills] = useState([]);
  const [role, setRole] = useState([]);
  const [bio, setBio] = useState("");
  const [selectedGenre, setSelectedGenre] = useState({
    Pop: false,
    Rock: false,
    HipHop: false,
    EDM: false,
  });
  const [genre, setGenre] = useState([]);
  const [trackOneUrl, setTrackOneUrl] = useState("");
  const [trackTwoUrl, setTrackTwoUrl] = useState("");
  const [trackThreeUrl, setTrackThreeUrl] = useState("");
  const [trackOneFile, setTrackOneFile] = useState(null);
  const [trackTwoFile, setTrackTwoFile] = useState(null);
  const [trackThreeFile, setTrackThreeFile] = useState(null);
  const [trackOneLabel, setTrackOneLabel] = useState("");
  const [trackTwoLabel, setTrackTwoLabel] = useState("");
  const [trackThreeLabel, setTrackThreeLabel] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [showPlayers, setShowPlayers] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [youtubeUrl2, setYoutubeUrl2] = useState("");

  const [prefSkills, setPrefSkills] = useState([]);
  const [prefRoles, setPrefRoles] = useState([]);
  const [prefGenre, setPrefGenre] = useState([]);
  const [soundCloudUrl, setSoundCloudUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const [selectedPrefSkills, setSelectedPrefSkills] = useState({
    Guitar: false,
    BassGuitar: false,
    Piano: false,
    Drums: false,
  });

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  useEffect(() => {
    if (user) {
      const userDocRef = firebase.firestore().collection("users").doc(user.uid);
      userDocRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.profileImageUrl) {
            setProfileImageUrl(userData.profileImageUrl);
          }
          if (userData.username) {
            setUsername(userData.username);
          }
          if (userData.bio) {
            setBio(userData.bio);
          }
          if (userData.skills) {
            setSkills(userData.skills);
          }
          if (userData.role) {
            setRole(userData.role);
          }
          if (userData["trackOne"]) {
            setTrackOneUrl(userData["trackOne"]);
          }
          if (userData["trackTwo"]) {
            setTrackTwoUrl(userData["trackTwo"]);
          }
          if (userData["trackThree"]) {
            setTrackThreeUrl(userData["trackThree"]);
          }
          if (userData.trackOneLabel) {
            setTrackOneLabel(userData.trackOneLabel);
          }
          if (userData.trackTwoLabel) {
            setTrackTwoLabel(userData.trackTwoLabel);
          }
          if (userData.trackThreeLabel) {
            setTrackThreeLabel(userData.trackThreeLabel);
          }
          if (userData.age) {
            setAge(userData.age);
          }
          if (userData.genre) {
            setGenre(userData.genre);
          }
          if (userData.prefSkills) {
            setPrefSkills(userData.prefSkills);
          }
          if (userData.prefRoles) {
            setPrefRoles(userData.prefRoles);
          }
          if (userData.prefGenre) {
            setPrefGenre(userData.prefGenre);
          }
          if (userData.youtubeUrl2) {
            setYoutubeUrl2(userData.youtubeUrl2);
          }
          if (userData.youtubeUrl) {
            setYoutubeUrl(userData.youtubeUrl);
          }
          if (userData.instagramUrl) {
            setInstagramUrl(userData.instagramUrl);
          }
          if (userData.twitterUrl) {
            setTwitterUrl(userData.twitterUrl);
          }
          if (userData.soundCloudUrl) {
            setSoundCloudUrl(userData.soundCloudUrl);
          }
        }
      });
    }
  }, [user]);

  const Player1 = ({ src }) => (
    <AudioPlayer
      autoPlay={false}
      src={src}
      onPlay={(e) => console.log("onPlay")}
    />
  );

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }
  function handleMoreClick() {
    setShowMore(!showMore);
  }
  let sculpture = sculptureList[index];
  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("selectedPrefGenre");
        localStorage.removeItem("selectedPrefRoles");
        localStorage.removeItem("selectedPrefSkills");
        localStorage.removeItem("likedUsers");

        console.log("user signed out");
      })
      .catch((err) => {
        console.log("err user signOut ", err);
      });
  };

  return (
    <>
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
          <>
            <button className="signout-button" onClick={signOut}>
              Sign out
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
      <div className="preview-box">
        {" "}
        <p>
          Go back to <Link to="/profile"> Profile</Link>
        </p>{" "}
      </div>

      <div className="column">
        <p>Biography: {bio}</p>
        <p> Your Roles: {role.join(`, `)}</p>

        <p>Your Skills: {skills.join(`, `)};</p>
        <p>Your Genres: {genre.join(`, `)}</p>
        <p>You are only looking fo people who play: {prefSkills.join(`, `)} </p>
        <p>You are only looking fo people who are: {prefRoles.join(`, `)} </p>
        <p>
          You are only looking fo people who listen to: {prefGenre.join(`, `)}{" "}
        </p>

        <SocialIcon network="soundcloud" target="_blank" url={soundCloudUrl} />
        <SocialIcon network="youtube" target="_blank" url={youtubeUrl} />
        <SocialIcon network="instagram" target="_blank" url={instagramUrl} />
        <SocialIcon network="twitter" target="_blank" url={twitterUrl} />
      </div>

      <div className="column">
        <div className="swiper">
          <div className="swiper-image">
            <img
              src={profileImageUrl}
              alt="Display Picture"
              className="display-picture"
            />{" "}
          </div>
          <div className="swiper-name">
            <h2>
              <i>
                {username}, {age}
              </i>{" "}
            </h2>{" "}
          </div>
          <div className="ButtonBox"></div>
        </div>
      </div>

      <div className="column">
        <button
          className="toggle-vid"
          onClick={() => setShowVideoPlayer(!showVideoPlayer)}
        >
          Toggle {showVideoPlayer ? "Audio Players" : "Video Player"}
        </button>
        {!showVideoPlayer && (
          <div className="Players">
            <div className="FirstPlayer">
              <h2 className="TrackTitle">
                <span className="label">Track One:</span> {trackOneLabel}
              </h2>{" "}
              <Player1 src={trackOneUrl} />
            </div>
            <div className="SecondPlayer">
              <h2 className="TrackTitle">
                <span className="label">Track Two:</span> {trackTwoLabel}
              </h2>{" "}
              <Player1 src={trackTwoUrl} />
            </div>
            <div className="ThirdPlayer">
              <h2 className="TrackTitle">
                <span className="label">Track Three:</span> {trackThreeLabel}
              </h2>{" "}
              <Player1 src={trackThreeUrl} />
            </div>
          </div>
        )}

        {showVideoPlayer && (
          <div className="VideoPlayer">
            <ReactPlayer
              width="600px"
              height=" 500px"
              controls
              url={youtubeUrl2}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
                facebook: {
                  appId: "12345",
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewProfile;
