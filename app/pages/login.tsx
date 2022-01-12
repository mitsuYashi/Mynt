import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import {firebase} from "../components/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";

import {RepositoryFactory} from "../repositories/RepositoryFactory";
const userRepository = RepositoryFactory.get('users');

const Login: NextPage = () => {
  useEffect(() => {
    // console.log(firebase);
  }, []);

  const userPost = async () => {
    const createResponse = await userRepository.post({user:{

    }})
  }

  const clickButton = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential == null) {
        } else {
          const token = credential.accessToken;
          const user = result.user;
          Router.push("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>login</h1>
      <button onClick={clickButton}>Googleでログイン</button>
    </div>
  );
};

export default Login;
