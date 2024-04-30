import { useState, useEffect } from "react";
import firebase from "../firebase";

export const usePrefSkills = (user) => {
  const skillPreferences = JSON.parse(
    localStorage.getItem("selectedPrefSkills")
  ) || {
    Guitar: false,
    BassGuitar: false,
    Piano: false,
    Drums: false,
  };

  const [selectedPrefSkills, setSelectedPrefSkills] =
    useState(skillPreferences);

  useEffect(() => {
    if (user) {
      const userDocRef = firebase.firestore().collection("users").doc(user.uid);
      userDocRef.get().then((doc) => {
        if (doc.exists && doc.data().prefSkills) {
          const skillsFromFirestore = {};
          doc.data().prefSkills.forEach((skill) => {
            skillsFromFirestore[skill] = true;
          });

          setSelectedPrefSkills((prev) => ({
            ...prev,
            ...skillsFromFirestore,
          }));
          localStorage.setItem(
            "selectedPrefSkills",
            JSON.stringify({ ...selectedPrefSkills, ...skillsFromFirestore })
          );
        }
      });
    }
  }, [user]);

  const PrefSkillcheckboxHandler = (skillName) => {
    setSelectedPrefSkills((prevSkills) => {
      const updatedPrefSkills = {
        ...prevSkills,
        [skillName]: !prevSkills[skillName],
      };
      localStorage.setItem(
        "selectedPrefSkills",
        JSON.stringify(updatedPrefSkills)
      );
      return updatedPrefSkills;
    });
  };

  const arrayofSelectedPrefSkills = () => {
    return Object.keys(selectedPrefSkills).filter(
      (skill) => selectedPrefSkills[skill]
    );
  };

  const prefSkillsToFirebase = async () => {
    const selectedPrefSkillsArray = arrayofSelectedPrefSkills();
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ prefSkills: selectedPrefSkillsArray });
    alert("Skill Preferences updated!");
  };

  return {
    selectedPrefSkills,
    PrefSkillcheckboxHandler,
    prefSkillsToFirebase,
    arrayofSelectedPrefSkills,
  };
};
