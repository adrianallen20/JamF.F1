import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from "../assets/jflogo.png";
import { sculptureList } from "./data.js";
import "react-h5-audio-player/lib/styles.css";
import midnights1 from "../assets/midnights1.mp3";
import { differenceInYears } from "date-fns";
import Popup from "reactjs-popup";
import TagField from "./TagField";
import UseTagInput from "./UseTagInput";
import ReactPlayer from "react-player";
import AudioPlayer from "react-h5-audio-player";
import { usePrefSkills } from "../modules/PrefSkillModule.jsx";
import { usePrefRoles } from "../modules/PrefRoleModule.jsx";
import { usePrefGenres } from "../modules/PrefGenreModule.jsx";
import { handleLike } from "../modules/MatchAlgo";

import { SocialIcon } from "react-social-icons";

const Jam = () => {
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
  const {
    selectedPrefSkills,
    PrefSkillcheckboxHandler,
    prefSkillsToFirebase,
    setSelectedPrefSkills,
  } = usePrefSkills(user);
  const {
    selectedPrefRoles,
    prefRolecheckboxHandler,
    prefRolesToFirebase,
    setSelectedPrefRoles,
  } = usePrefRoles(user);
  const {
    selectedPrefGenre,
    prefGenrecheckboxHandler,
    PrefGenreToFirebase,
    setSelectedPrefGenre,
  } = usePrefGenres(user);
  const [otherUsers, setOtherUsers] = useState([]);
  const currentProfile = otherUsers[index] || {};

  const [soundCloudUrl, setSoundCloudUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const [youtubeUrl2, setYoutubeUrl2] = useState("");

  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const storedLikedUsers = localStorage.getItem("likedUsers");
    if (storedLikedUsers) {
      setLikedUsers(JSON.parse(storedLikedUsers));
    }
  }, []);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    usersRef.get().then((snapshot) => {
      const filteredUsers = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          trackOneUrl: doc.data().trackOne || "",
          trackTwoUrl: doc.data().trackTwo || "",
          trackThreeUrl: doc.data().trackThree || "",
          ...doc.data(),
        }))
        .filter((u) => u.id !== user.uid && !likedUsers.includes(u.id))
        .filter((otherUser) => {
          const genreMatch = Object.keys(selectedPrefGenre).some(
            (genre) =>
              selectedPrefGenre[genre] &&
              otherUser.genre &&
              otherUser.genre.includes(genre)
          );
          const skillsMatch = Object.keys(selectedPrefSkills).some(
            (skill) =>
              selectedPrefSkills[skill] &&
              otherUser.skills &&
              otherUser.skills.includes(skill)
          );
          const rolesMatch = Object.keys(selectedPrefRoles).some(
            (role) =>
              selectedPrefRoles[role] &&
              otherUser.role &&
              otherUser.role.includes(role)
          );

          return genreMatch && skillsMatch && rolesMatch;
        });

      setOtherUsers(filteredUsers);
    });
  }, [
    user,
    selectedPrefGenre,
    selectedPrefSkills,
    selectedPrefRoles,
    likedUsers,
  ]);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  const handlePrevClick = () => {
    setIndex((prev) => {
      if (prev === 0) return otherUsers.length - 1;
      return prev - 1;
    });
  };

  const handleNextClick = () => {
    setIndex((prev) => {
      if (prev === otherUsers.length - 1) return 0;
      return prev + 1;
    });
  };

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
          if (userData.prefgenre) {
            setPrefGenre(userData.prefgenre);
          }
          if (userData.prefskill) {
            setPrefSkill(userData.prefskill);
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

  const onLikeButtonClick = async (likedUserId) => {
    if (user.uid && likedUserId) {
      try {
        await handleLike(user.uid, likedUserId);

        const newLikedUsers = [...likedUsers, likedUserId];
        localStorage.setItem("likedUsers", JSON.stringify(newLikedUsers));
        setLikedUsers(newLikedUsers);

        setOtherUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== likedUserId)
        );
      } catch (error) {
        console.error("Error liking user:", error);
      }
    }
  };

  const Player1 = ({ src }) => (
    <AudioPlayer
      autoPlay={false}
      src={src}
      onPlay={(e) => console.log("onPlay")}
    />
  );

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("selectedPrefGenre");
        localStorage.removeItem("selectedPrefRoles");
        localStorage.removeItem("selectedPrefSkills");
        localStorage.removeItem("likedUsers");

        console.log(" deleted lcoal strage out");

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
        <Popup
          trigger={<button className="pref-button"> Preferences </button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header"> Set Preferences </div>
              <div className="content">
                {" "}
                <div></div>
                <h5> Enter Skills you'd like to see</h5>
                <div className="skills">
                  <p>Skills</p>
                  <label className="container">
                    {" "}
                    Guitar
                    <input
                      type="checkbox"
                      name="Guitar"
                      checked={selectedPrefSkills["Guitar"]}
                      onChange={() => PrefSkillcheckboxHandler("Guitar")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">
                    Bass Guitar
                    <input
                      type="checkbox"
                      name="BassGuitar"
                      checked={selectedPrefSkills["BassGuitar"]}
                      onChange={() => PrefSkillcheckboxHandler("BassGuitar")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">
                    Piano
                    <input
                      type="checkbox"
                      name="Piano"
                      checked={selectedPrefSkills["Piano"]}
                      onChange={() => PrefSkillcheckboxHandler("Piano")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">
                    Drums
                    <input
                      type="checkbox"
                      name="Drums"
                      checked={selectedPrefSkills["Drums"]}
                      onChange={() => PrefSkillcheckboxHandler("Drums")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <button
                    className="skill-check-button"
                    onClick={prefSkillsToFirebase}
                    id="submit"
                  >
                    Save Skills{" "}
                  </button>
                </div>
                <div></div>
                <br />
                <h5> Enter Genre you'd like to see</h5>
                <div className="skills">
                  <label className="container">
                    {" "}
                    Pop
                    <input
                      type="checkbox"
                      name="Pop"
                      checked={selectedPrefGenre["Pop"]}
                      onChange={() => prefGenrecheckboxHandler("Pop")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">
                    Rock
                    <input
                      type="checkbox"
                      name="Rock "
                      checked={selectedPrefGenre["Rock"]}
                      onChange={() => prefGenrecheckboxHandler("Rock")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">
                    Hip-Hop
                    <input
                      type="checkbox"
                      name="HipHop"
                      checked={selectedPrefGenre["HipHop"]}
                      onChange={() => prefGenrecheckboxHandler("HipHop")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">
                    EDM
                    <input
                      type="checkbox"
                      name="EDM "
                      checked={selectedPrefGenre["EDM "]}
                      onChange={() => prefGenrecheckboxHandler("EDM ")}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <button
                    className="genre-check-button"
                    onClick={PrefGenreToFirebase}
                    id="submit"
                  >
                    Save Genres{" "}
                  </button>
                </div>
                <br />
                <h5> Enter Roles you'd like to see</h5>
                <p>Roles</p>
                {/* <p> Your Roles: {role.join(`, `)}</p> */}
                <label className="container">
                  {" "}
                  Singer
                  <input
                    type="checkbox"
                    name="Singer"
                    checked={selectedPrefRoles["Singer"]}
                    onChange={() => prefRolecheckboxHandler("Singer")}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container">
                  Rapper
                  <input
                    type="checkbox"
                    name="Rapper"
                    checked={selectedPrefRoles["Rapper"]}
                    onChange={() => prefRolecheckboxHandler("Rapper")}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container">
                  Producer
                  <input
                    type="checkbox"
                    name="Producer"
                    checked={selectedPrefRoles["Producer"]}
                    onChange={() => prefRolecheckboxHandler("Producer")}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container">
                  Instrumentalist
                  <input
                    type="checkbox"
                    name="Instrumentalist"
                    checked={selectedPrefRoles["Instrumentalist"]}
                    onChange={() => prefRolecheckboxHandler("Instrumentalist")}
                  />
                  <span className="checkmark"></span>
                </label>
                <button
                  className="role-check-button"
                  id="submit"
                  onClick={prefRolesToFirebase}
                >
                  Save Roles{" "}
                </button>
              </div>
              <div className="actions">
                <button className="button"> Apply </button>

                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>{" "}
      </div>

      <div className="column">
        <p class="profile-info">Biography: {currentProfile.bio}</p>
        <p class="profile-info">
          Their Roles: {currentProfile.role?.join(", ") || ""}
        </p>
        <p class="profile-info">
          Their Skills: {currentProfile.skills?.join(", ") || ""}
        </p>
        <p class="profile-info">
          Their Genres: {currentProfile.genre?.join(", ") || ""}
        </p>

        <div className="social-icons-container">
          <SocialIcon
            network="soundcloud"
            target="_blank"
            url={currentProfile.soundCloudUrl}
          />
          <SocialIcon
            network="youtube"
            target="_blank"
            url={currentProfile.youtubeUrl}
          />
          <SocialIcon
            network="instagram"
            target="_blank"
            url={currentProfile.instagramUrl}
          />
          <SocialIcon
            network="twitter"
            target="_blank"
            url={currentProfile.twitterUrl}
          />
        </div>
      </div>

      <div className="column">
        <div className="swiper">
          <div className="swiper-image">
            <img
              src={currentProfile.profileImageUrl}
              alt="Display Picture"
              className="display-picture"
            />{" "}
          </div>
          <div className="swiper-name">
            <h2>
              <i>
                {currentProfile.username}, {currentProfile.age}
              </i>{" "}
            </h2>{" "}
          </div>
          <div className="ButtonBox">
            <button className="PreviousButton" onClick={handlePrevClick}>
              {" "}
              B
            </button>
            <button className="NextButton" onClick={handleNextClick}>
              {" "}
              F
            </button>
          </div>
          <button
            className="LikeButton"
            onClick={() => onLikeButtonClick(currentProfile.id)}
          >
            LIKE
          </button>
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
                <span className="label">Track Two:</span>{" "}
                {currentProfile.trackOneLabel}
              </h2>{" "}
              <Player1 src={currentProfile.trackOneUrl} />
            </div>
            <div className="SecondPlayer">
              <h2 className="TrackTitle">
                <span className="label">Track Two:</span>{" "}
                {currentProfile.trackTwoLabel}
              </h2>{" "}
              <Player1 src={currentProfile.trackTwoUrl} />
            </div>
            <div className="ThirdPlayer">
              <h2 className="TrackTitle">
                <span className="label">Track Three:</span>{" "}
                {currentProfile.trackThreeLabel}
              </h2>
              <Player1 src={currentProfile.trackThreeUrl} />
            </div>
          </div>
        )}

        {showVideoPlayer && (
          <div className="VideoPlayer">
            <ReactPlayer
              width="600px"
              height=" 500px"
              controls
              url={currentProfile.youtubeUrl2}
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

export default Jam;
