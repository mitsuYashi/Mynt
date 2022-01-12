import { initializeApp } from "firebase/app";
import fb from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from "next/router";

const config = {
  apiKey: "AIzaSyCrPWdNBx4hszLkBOy4dG4Cw6XrdZaO0W8",
  authDomain: "mynt-hew-project.firebaseapp.com",
  projectId: "mynt-hew-project",
  storageBucket: "mynt-hew-project.appspot.com",
  messagingSenderId: "701659823314",
  appId: "1:701659823314:web:b23bc42792af4ce0c3c10b",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
// export const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();
// export const firestore = firebase.firestore();

export const firebase = initializeApp(config);


export const listenAuthState = (firebase: any) => new Promise<string>((resolve, reject) => {
  const auth = getAuth(firebase);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const uid = user.uid;
      resolve(user.uid);
    }
  });
});

