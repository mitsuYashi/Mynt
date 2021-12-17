import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCrPWdNBx4hszLkBOy4dG4Cw6XrdZaO0W8",
  authDomain: "mynt-hew-project.firebaseapp.com",
  projectId: "mynt-hew-project",
  storageBucket: "mynt-hew-project.appspot.com",
  messagingSenderId: "701659823314",
  appId: "1:701659823314:web:b23bc42792af4ce0c3c10b",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
// export const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();
// export const firestore = firebase.firestore();

export default initializeApp(config);


// export default firebase;
