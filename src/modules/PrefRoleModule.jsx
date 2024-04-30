import { useState, useEffect } from "react";
import firebase from "../firebase";

export const usePrefRoles = (user) => {
  const rolePreferences = JSON.parse(
    localStorage.getItem("selectedPrefRoles")
  ) || {
    Singer: false,
    Rapper: false,
    Producer: false,
    Instrumentalist: false,
  };

  const [selectedPrefRoles, setSelectedPrefRoles] = useState(rolePreferences);

  useEffect(() => {
    if (user) {
      const userDocRef = firebase.firestore().collection("users").doc(user.uid);
      userDocRef.get().then((doc) => {
        if (doc.exists && doc.data().prefRoles) {
          const rolesFromFirestore = {};
          doc.data().prefRoles.forEach((role) => {
            rolesFromFirestore[role] = true;
          });

          setSelectedPrefRoles((prev) => ({
            ...prev,
            ...rolesFromFirestore,
          }));
          localStorage.setItem(
            "selectedPrefRoles",
            JSON.stringify({ ...selectedPrefRoles, ...rolesFromFirestore })
          );
        }
      });
    }
  }, [user]);

  const prefRolecheckboxHandler = (roleName) => {
    setSelectedPrefRoles((prevRoles) => {
      const updatedPrefRoles = {
        ...prevRoles,
        [roleName]: !prevRoles[roleName],
      };
      localStorage.setItem(
        "selectedPrefRoles",
        JSON.stringify(updatedPrefRoles)
      );
      return updatedPrefRoles;
    });
  };

  const arrayofSelectedPrefRoles = () => {
    return Object.keys(selectedPrefRoles).filter(
      (role) => selectedPrefRoles[role]
    );
  };

  const prefRolesToFirebase = async () => {
    const selectedPrefRolesArray = arrayofSelectedPrefRoles();
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);
    await userDocRef.update({ prefRoles: selectedPrefRolesArray });
    alert("Preferences updated!");
  };

  return {
    selectedPrefRoles,
    prefRolecheckboxHandler,
    prefRolesToFirebase,
    arrayofSelectedPrefRoles,
  };
};
