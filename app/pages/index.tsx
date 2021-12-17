import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import firebase from "../components/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";

interface State {
  num: number[];
}

const initialState: State = {
  num: [],
};

const Home: NextPage = () => {
  useEffect(() => {
    console.log(firebase);
  }, []);

  const clickButton = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Googleアカウントでログインしました。");
          console.log(result.user);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>test</h1>
      <button onClick={clickButton}>Googleでログイン</button>
    </div>
  );
};

export default Home;
