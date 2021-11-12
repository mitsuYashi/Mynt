// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPiJHG_iYo-DOGasX1D4bJKMx2w7UmdkI",
  authDomain: "hew-project-25587.firebaseapp.com",
  projectId: "hew-project-25587",
  storageBucket: "hew-project-25587.appspot.com",
  messagingSenderId: "821584206223",
  appId: "1:821584206223:web:9ca05f950c4846350a53fa",
  measurementId: "G-CRJCPMV4JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
