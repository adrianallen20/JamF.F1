import { useState } from "react";
import firebase from "../firebase";
export const useSkills = (user) => {
  const [selectedSkills, setSelectedSkills] = useState({
    Guitar: false,
    BassGuitar: false,
    Piano: false,
    Drums: false,
  });

  const skillsToFirebase = async () => {
    const selectedSkillsArray = arrayofSelectedSkills();
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ skills: selectedSkillsArray });
    alert("skills added from button checkbox");
  };

  const checkboxHandler = (SkillName) => {
    setSelectedSkills((prevSkills) => ({
      ...prevSkills,
      [SkillName]: !prevSkills[SkillName],
    }));
  };

  const arrayofSelectedSkills = () => {
    const selectedSkillsArray = Object.keys(selectedSkills).filter(
      (skill) => selectedSkills[skill]
    );
    return selectedSkillsArray;
  };

  return {
    selectedSkills,
    checkboxHandler,
    skillsToFirebase,
    arrayofSelectedSkills,
  };
};
