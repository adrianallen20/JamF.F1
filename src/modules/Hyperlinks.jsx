import React, { useState } from "react";
import firebase from "../firebase";

const Hyperlinks = ({ user }) => {
  const [soundCloudUrl, setSoundCloudUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const handleURLUpload = async (urlType, url) => {
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    try {
      await userDocRef.update({ [`${urlType}Url`]: url });
      alert(`${urlType} link uploaded successfully!`);
    } catch (error) {
      console.error(`Failed to upload ${urlType} link:`, error);
      alert(`Failed to upload ${urlType} link.`);
    }
  };

  return (
    <div className="social-links-container">
      <p>SoundCloud</p>
      <input
        type="text"
        placeholder="Enter Soundcloud URL"
        value={soundCloudUrl}
        onChange={(e) => setSoundCloudUrl(e.target.value)}
        className="input-soundcloud"
      />
      <button
        className="SC-link-upload"
        onClick={() => handleURLUpload("soundCloud", soundCloudUrl)}
      >
        Upload Link
      </button>

      <p>Youtube</p>
      <input
        type="text"
        placeholder="Enter Youtube URL"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="input-youtube"
      />
      <button
        className="YT2-link-upload"
        onClick={() => handleURLUpload("youtube", youtubeUrl)}
      >
        Upload Link
      </button>

      <p>Instagram</p>
      <input
        type="text"
        placeholder="Enter Instagram URL"
        value={instagramUrl}
        onChange={(e) => setInstagramUrl(e.target.value)}
        className="input-instagram"
      />
      <button
        className="ig-link-upload"
        onClick={() => handleURLUpload("instagram", instagramUrl)}
      >
        Upload Link
      </button>

      <p>Twitter</p>
      <input
        type="text"
        placeholder="Enter Twitter URL"
        value={twitterUrl}
        onChange={(e) => setTwitterUrl(e.target.value)}
        className="input-twitter"
      />
      <button
        className="twt-link-upload"
        onClick={() => handleURLUpload("twitter", twitterUrl)}
      >
        Upload Link
      </button>
    </div>
  );
};

export default Hyperlinks;
