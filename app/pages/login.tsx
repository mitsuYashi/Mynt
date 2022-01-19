import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import { firebase } from "../components/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const clientRepository = RepositoryFactory.get("client");
const mentaRepository = RepositoryFactory.get("menta");

const Login: NextPage = () => {
  useEffect(() => {
    // console.log(firebase);
  }, []);

  const clientPost = async (uid: string, mail: string, username: string) => {
    const createResponse = await clientRepository.post({
      client: {
        uuid: uid,
        mail: mail,
        name: username,
      },
    });
  };
  const mentaPost = async (uid: string, mail: string, username: string) => {
    const createResponse = await mentaRepository.post({
      menta: {
        uuid: uid,
        mail: mail,
        name: username,
      },
    });
  };

  const userButton = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential == null) {
        } else {
          const token = credential.accessToken;
          const user = result.user;
          clientPost(
            user.uid,
            user.email ? user.email : "",
            user.displayName ? user.displayName : "unknown"
          );
          Router.push("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const mentaButton = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential == null) {
        } else {
          const token = credential.accessToken;
          const user = result.user;
          mentaPost(
            user.uid,
            user.email ? user.email : "",
            user.displayName ? user.displayName : "unknown"
          );
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
      <button onClick={mentaButton}>メンターで登録</button>
      <button onClick={userButton}>一般ユーザーで登録</button>
    </div>
  );
};

export default Login;
