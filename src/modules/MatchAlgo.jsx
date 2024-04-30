import firebase from "../firebase";

export const handleLike = async (userId, likedUserId) => {
  const likedUserRef = firebase
    .firestore()
    .collection("users")
    .doc(likedUserId);
  const doc = await likedUserRef.get();

  if (doc.exists) {
    const likedUserData = doc.data();
    if (!likedUserData.likes) {
      likedUserData.likes = [];
    }
    likedUserData.likes.push(userId);

    await likedUserRef.update({
      likes: likedUserData.likes,
    });
    await checkForMutualLike(userId, likedUserId);
  }
};

export const checkForMutualLike = async (userId, likedUserId) => {
  const userRef = firebase.firestore().collection("users").doc(userId);
  const likedUserRef = firebase
    .firestore()
    .collection("users")
    .doc(likedUserId);

  const userDoc = await userRef.get();
  const likedUserDoc = await likedUserRef.get();

  if (userDoc.exists && likedUserDoc.exists) {
    const currentUserData = userDoc.data();
    const likedUserData = likedUserDoc.data();

    if (
      currentUserData.likes &&
      likedUserData.likes &&
      currentUserData.likes.includes(likedUserId) &&
      likedUserData.likes.includes(userId)
    ) {
      console.log("Match!!");
      alert("MATCH!!");

      userRef
        .collection("matches")
        .doc(likedUserId)
        .set({ matchWith: likedUserId });
      likedUserRef.collection("matches").doc(userId).set({ matchWith: userId });
    } else {
      console.log(" Liked!");
      alert("User Liked");
    }
  }
};
