import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};

export const getMessagingToken = () => {
  return getToken(getMessaging(initFirebase()));
};
