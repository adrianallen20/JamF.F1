import { useState } from "react";
import firebase from "../firebase";

export const useRoles = (user) => {
  const [selectedRoles, setSelectedRoles] = useState({
    Singer: false,
    Rapper: false,
    Producer: false,
    Instrumentalist: false,
  });

  const rolecheckboxHandler = (RoleName) => {
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [RoleName]: !prevRoles[RoleName],
    }));
  };
  const arrayofSelectedRoles = () => {
    const selectedRolesArray = Object.keys(selectedRoles).filter(
      (role) => selectedRoles[role]
    );
    return selectedRolesArray;
  };

  const rolesToFirebase = async () => {
    const selectedRolesArray = arrayofSelectedRoles();
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ role: selectedRolesArray });
    alert("Roles added from button checkbox");
  };

  return {
    selectedRoles,
    rolecheckboxHandler,
    rolesToFirebase,
    arrayofSelectedRoles,
  };
};
