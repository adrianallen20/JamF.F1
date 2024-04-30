import firebase from "../firebase";

export const fetchMessages = async (chatId) => {
  const messagesRef = firebase
    .firestore()
    .collection(`chats/${chatId}/messages`)
    .orderBy("timestamp");
  const snapshot = await messagesRef.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const sendMessage = async (chatId, text, userId) => {
  if (text.trim()) {
    await firebase.firestore().collection(`chats/${chatId}/messages`).add({
      text,
      senderId: userId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
};
