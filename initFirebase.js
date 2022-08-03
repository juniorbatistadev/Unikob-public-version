import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDI0Jb4q-cepyjf3aAR3VRb1xDD1ycHn8k",
    authDomain: "unikob-43fd8.firebaseapp.com",
    projectId: "unikob-43fd8",
    storageBucket: "unikob-43fd8.appspot.com",
    messagingSenderId: "468451085235",
    appId: "1:468451085235:web:11e886d80056dd7e1519c6",
    measurementId: "G-XG05TBZ8PL",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
