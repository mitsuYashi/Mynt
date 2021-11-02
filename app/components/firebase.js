// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRRi0OJVPRc_NEXjmI6Vr1GsSXsTvwsgA",
  authDomain: "mynt-93713.firebaseapp.com",
  projectId: "mynt-93714",
  storageBucket: "mynt-93714.appspot.com",
  messagingSenderId: "144133948079",
  appId: "1:144133948079:web:16161333a1d64859344a5a",
  measurementId: "G-N3LVQMKS8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);