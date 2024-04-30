import { useState, useEffect } from "react";
import firebase from "../firebase";

export const usePrefGenres = (user) => {
  const genrePreferences = JSON.parse(
    localStorage.getItem("selectedPrefGenre")
  ) || {
    Pop: false,
    Rock: false,
    HipHop: false,
    EDM: false,
  };

  const [selectedPrefGenre, setSelectedPrefGenre] = useState(genrePreferences);

  useEffect(() => {
    if (user) {
      const userDocRef = firebase.firestore().collection("users").doc(user.uid);
      userDocRef.get().then((doc) => {
        if (doc.exists && doc.data().prefGenre) {
          const genresFromFirestore = {};
          doc.data().prefGenre.forEach((genre) => {
            genresFromFirestore[genre] = true;
          });

          setSelectedPrefGenre((prev) => ({
            ...prev,
            ...genresFromFirestore,
          }));
          localStorage.setItem(
            "selectedPrefGenre",
            JSON.stringify({ ...selectedPrefGenre, ...genresFromFirestore })
          );
        }
      });
    }
  }, [user]);

  const prefGenrecheckboxHandler = (genreName) => {
    setSelectedPrefGenre((prevPrefGenre) => {
      const updatedPrefGenre = {
        ...prevPrefGenre,
        [genreName]: !prevPrefGenre[genreName],
      };
      localStorage.setItem(
        "selectedPrefGenre",
        JSON.stringify(updatedPrefGenre)
      );
      return updatedPrefGenre;
    });
  };

  const arrayofSelectedPrefGenre = () => {
    return Object.keys(selectedPrefGenre).filter(
      (genre) => selectedPrefGenre[genre]
    );
  };

  const PrefGenreToFirebase = async () => {
    const selectedPrefGenreArray = arrayofSelectedPrefGenre();
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ prefGenre: selectedPrefGenreArray });
    alert("Genre Preferences updated!");
  };

  return {
    selectedPrefGenre,
    prefGenrecheckboxHandler,
    PrefGenreToFirebase,
    arrayofSelectedPrefGenre,
  };
};
