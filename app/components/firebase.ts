import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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
export const db = getFirestore();

type message = {
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  uid: string;
  sendUid: string;
  message: string;
};

export const addMessage = async (
  uid: string,
  toUid: string,
  message: string
) => {
  try {
    const userIds = [uid, toUid].sort();
    const id = userIds[0] + userIds[1];
    const docRef = await addDoc(collection(db, id), {
      user: uid,
      message: message,
      created_at: new Date(),
    });
    console.log("Document wiriten");
  } catch (err) {
    console.error(err);
  }
};

// データの取得のみおこなう
// not use
export const getMessage = async (uid: string, toUid: string) => {
  let messages: message[] = [];
  const userIds = [uid, toUid].sort();
  const id = userIds[0] + userIds[1];
  const messagesRef = collection(db, "aaa");
  const res = await getDocs(messagesRef);
  res.forEach((doc) => {
    messages.push(doc.data() as message);
  });

  return messages;
};

export const listenAuthState = (firebase: any) =>
  new Promise<string>((resolve, reject) => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(user.uid);
      }
    });
  });
