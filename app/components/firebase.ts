import firebase from "firebase/app";
import "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAPiJHG_iYo-DOGasX1D4bJKMx2w7UmdkI",
  authDomain: "hew-project-25587.firebaseapp.com",
  projectId: "hew-project-25587",
  storageBucket: "hew-project-25587.appspot.com",
  messagingSenderId: "821584206223",
  appId: "1:821584206223:web:9ca05f950c4846350a53fa",
  measurementId: "G-CRJCPMV4JK",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;
