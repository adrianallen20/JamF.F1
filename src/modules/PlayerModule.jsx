import { useState } from "react";
import firebase from "../firebase";

export const useAudioPlayers = (user) => {
  const [trackOneUrl, setTrackOneUrl] = useState("");
  const [trackTwoUrl, setTrackTwoUrl] = useState("");
  const [trackThreeUrl, setTrackThreeUrl] = useState("");
  const [trackOneFile, setTrackOneFile] = useState(null);
  const [trackTwoFile, setTrackTwoFile] = useState(null);
  const [trackThreeFile, setTrackThreeFile] = useState(null);
  const [trackOneLabel, setTrackOneLabel] = useState("");
  const [trackTwoLabel, setTrackTwoLabel] = useState("");
  const [trackThreeLabel, setTrackThreeLabel] = useState("");

  const handleTrackOneFileChange = (e) => {
    if (e.target.files[0]) {
      console.log("Track 1 File:", e.target.files[0]);
      setTrackOneFile(e.target.files[0]);
    }
  };
  const handleTrackTwoFileChange = (e) => {
    if (e.target.files[0]) {
      setTrackTwoFile(e.target.files[0]);
    }
  };
  const handleTrackThreeFileChange = (e) => {
    if (e.target.files[0]) {
      setTrackThreeFile(e.target.files[0]);
    }
  };

  const handleMp3Upload = async (trackName, file) => {
    const storageRef = firebase.storage().ref();
    const mp3Ref = storageRef.child(
      `music/${user.uid}/${trackName}/${file.name}`
    );

    await mp3Ref.put(file);
    const mp3Url = await mp3Ref.getDownloadURL();
    console.log(`${trackName} URL:`, mp3Url);
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ [trackName]: mp3Url });
    alert(`${trackName} uploaded successfully!`);
  };

  const updateTrackOneLabel = async () => {
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ trackOneLabel: trackOneLabel });
    alert("track One Label added!");
  };

  const updateTrackTwoLabel = async () => {
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ trackTwoLabel: trackTwoLabel });
    alert("track two Label added!");
  };

  const updateTrackThreeLabel = async () => {
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ trackThreeLabel: trackThreeLabel });
    alert("track three Label added!");
  };

  return {
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
  };
};
