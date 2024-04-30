import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from "../assets/jflogo.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import midnights1 from "../assets/midnights1.mp3";
import { differenceInYears } from "date-fns";
import Popup from "reactjs-popup";
import TagField from "./TagField";
import UseTagInput from "./UseTagInput";
import { useGenre } from "../modules/GenreModule";
import { useSkills } from "../modules/SkillsModule";
import { useRoles } from "../modules/RolesModule";
import { useAudioPlayers } from "../modules/PlayerModule";
import ProfileImageUploader from "../modules/ProfileImageUploader";
import RolesComponent from "./RolesComponent";
import SkillsComponent from "./SkillsComponent";
import GenreComponent from "./GenreComponent";

import Hyperlinks from "../modules/Hyperlinks";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [genre, setGenre] = useState([]);
  const [skills, setSkills] = useState([]);
  const [role, setRole] = useState([]);
  const [bio, setBio] = useState("");
  const [youtubeUrl2, setYoutubeUrl2] = useState("");

  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const { tags, handleAddTag, handleRemoveTag } = UseTagInput(10);
  const { selectedGenre, genrecheckboxHandler, genreToFirebase } =
    useGenre(user);
  const { selectedSkills, checkboxHandler, skillsToFirebase } = useSkills(user);
  const { selectedRoles, rolecheckboxHandler, rolesToFirebase } =
    useRoles(user);
  const {
    trackOneFile,
    trackTwoFile,
    trackThreeFile,
    trackOneUrl,
    trackTwoUrl,
    trackThreeUrl,
    setTrackOneUrl,
    setTrackTwoUrl,
    setTrackThreeUrl,
    handleTrackOneFileChange,
    handleTrackTwoFileChange,
    handleTrackThreeFileChange,
    handleMp3Upload,
    trackOneLabel,
    trackTwoLabel,
    trackThreeLabel,
    setTrackOneLabel,
    setTrackTwoLabel,
    setTrackThreeLabel,
    updateTrackOneLabel,
    updateTrackTwoLabel,
    updateTrackThreeLabel,
  } = useAudioPlayers(user);

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const today = new Date();
    const calculatedAge = differenceInYears(today, birthDate);
    setAge(calculatedAge);
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    userDocRef.update({
      age: calculatedAge,
    });
  };

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

  const updateBio = async () => {
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ bio: bio });
    alert("Bio added!");
  };

  const saveTagsToFirestore = async () => {
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.set(
      {
        tags: tags,
      },
      { merge: true }
    );
    alert("Tags saved successfully!");
  };

  const handleYoutubeLinkUpload = async () => {
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    try {
      await userDocRef.update({ youtubeUrl2 });
      alert("YouTube link uploaded successfully!");
    } catch (error) {
      alert("Failed to upload YouTube link.");
    }
  };

  const Player1 = ({ src }) => (
    <AudioPlayer
      autoPlay={false}
      src={src}
      onPlay={(e) => console.log("onPlay")}
    />
  );

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
          if (userData.tags) {
            handleAddTag(userData.tags);
          }
          if (userData.genre) {
            setGenre(userData.genre);
          }
          if (userData.youtubeUrl2) {
            setYoutubeUrl2(userData.youtubeUrl2);
          }
        }
      });
    }
  }, [user]);

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
          {" "}
          <Link to="/PreviewProfile">Preview Profile</Link>
        </p>{" "}
      </div>

      <div className="three-columns">
        <div className="column">
          <p> Hey {username}, Tell us about yourself!</p>
          <p>Enter age: {age}</p>
          <input
            type="date"
            placeholder="Enter BirthDate"
            className="date-input"
            name="birthdate"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button className="calenderbutton" id="submit" onClick={calculateAge}>
            Add age{" "}
          </button>
          <div className="bio">
            <label className="bio-label">Write your bio: </label>

            <textarea
              className="bio-box"
              name="postContent"
              rows={1}
              cols={40}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button className="bio-button" id="submit" onClick={updateBio}>
            Update Bio{" "}
          </button>

          <p> List your roles and skills, so that others can find you!</p>
          <RolesComponent
            selectedRoles={selectedRoles}
            rolecheckboxHandler={rolecheckboxHandler}
            rolesToFirebase={rolesToFirebase}
          />
          <SkillsComponent
            selectedSkills={selectedSkills}
            checkboxHandler={checkboxHandler}
            skillsToFirebase={skillsToFirebase}
          />
          <GenreComponent
            selectedGenre={selectedGenre}
            genrecheckboxHandler={genrecheckboxHandler}
            genreToFirebase={genreToFirebase}
          />

          <p>Custom roles:{tags}</p>
          <Popup
            trigger={<button className="button"> Add Custom Skills </button>}
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Add Custom Skills </div>
                <div className="content">
                  {" "}
                  <h5> Enter Roles</h5>
                  <div>
                    <TagField
                      tags={tags}
                      addTag={handleAddTag}
                      removeTag={handleRemoveTag}
                      maxTags={10}
                    />
                  </div>
                  <br />
                  <h5> Enter Skills</h5>
                  <br />
                  <h5> Enter Genres</h5>
                </div>
                <div className="actions">
                  <button className="button" onClick={saveTagsToFirestore}>
                    {" "}
                    Apply{" "}
                  </button>

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
          </Popup>
        </div>

        <div className="column">
          <p className="email-text">Email: {user.email}</p>
          <div className="fields">
            <ProfileImageUploader user={user} defImageUrl={profileImageUrl} />
          </div>
        </div>

        <div className="column">
          <div className="music-upload-section">
            <p>Add your music here!</p>
            <input
              type="file"
              className="music-upload"
              onChange={handleTrackOneFileChange}
            />

            <div className="track-controls">
              <button
                className="music-submit"
                onClick={() => handleMp3Upload("trackOne", trackOneFile)}
              >
                Upload Track 1
              </button>
              <input
                className="track-label-input"
                type="text"
                onChange={(e) => setTrackOneLabel(e.target.value)}
              />
              <button className="label-submit" onClick={updateTrackOneLabel}>
                Name Track One
              </button>
            </div>

            <input
              type="file"
              className="music-upload"
              onChange={handleTrackTwoFileChange}
            />

            <div className="track-controls">
              <button
                className="music-submit"
                onClick={() => handleMp3Upload("trackTwo", trackTwoFile)}
              >
                Upload Track 2
              </button>
              <input
                className="track-label-input"
                type="text"
                onChange={(e) => setTrackTwoLabel(e.target.value)}
              />
              <button className="label-submit" onClick={updateTrackTwoLabel}>
                Name Track Two
              </button>
            </div>

            <input
              type="file"
              className="music-upload"
              onChange={handleTrackThreeFileChange}
            />

            <div className="track-controls">
              <button
                className="music-submit"
                onClick={() => handleMp3Upload("trackThree", trackThreeFile)}
              >
                Upload Track 3
              </button>
              <input
                className="track-label-input"
                type="text"
                onChange={(e) => setTrackThreeLabel(e.target.value)}
              />
              <button className="label-submit" onClick={updateTrackThreeLabel}>
                Name Track Three
              </button>
            </div>
          </div>

          <p className="hyp">Add Social Media Hyperlinks</p>
          <Popup
            trigger={<button className="add-links-button">Add Links </button>}
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Link your Social media </div>
                <div className="content">
                  {" "}
                  <div></div>
                  <br />
                  <h5> Add a youtube URL to link a video</h5>
                  <div className="yt-link">
                    <div className="youtube-upload-form">
                      <input
                        type="text"
                        className="yt-input"
                        value={youtubeUrl2}
                        placeholder="Enter YouTube URL"
                        onChange={(e) => setYoutubeUrl2(e.target.value)}
                      />
                      <button
                        className="yt-link-upload"
                        id="submit"
                        onClick={handleYoutubeLinkUpload}
                      >
                        Upload Link
                      </button>
                    </div>
                  </div>
                  <h5> Enter your social Media handles</h5>
                  <Hyperlinks user={user} />
                </div>

                <div className="actions">
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
          </Popup>
        </div>
      </div>
    </>
  );
};

export default Profile;
