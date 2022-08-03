/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDI0Jb4q-cepyjf3aAR3VRb1xDD1ycHn8k",
  authDomain: "unikob-43fd8.firebaseapp.com",
  projectId: "unikob-43fd8",
  storageBucket: "unikob-43fd8.appspot.com",
  messagingSenderId: "468451085235",
  appId: "1:468451085235:web:11e886d80056dd7e1519c6",
  measurementId: "G-XG05TBZ8PL",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
