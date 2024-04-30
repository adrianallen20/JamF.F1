import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const ProfileImageUploader = ({ user, defImageUrl }) => {
  const [file, setFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(defImageUrl);

  useEffect(() => {
    setProfileImageUrl(defImageUrl);
  }, [defImageUrl]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`profileImages/${user.uid}/${file.name}`);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ profileImageUrl: fileUrl });
    setProfileImageUrl(fileUrl);
    alert("Image uploaded successfully!");
  };

  return (
    <div className="profile-image-uploader">
      <img
        src={profileImageUrl || "https://i.imgur.com/Mx7dA2Y.jpg"}
        alt="Display Picture"
        className="uploader-image"
      />
      <div className="upload-container">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} className="img-upload-button">
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
