import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import { firebase, listenAuthState } from "../../components/firebase";
import { ParsedUrlQuery } from "querystring";

import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const userRepository = RepositoryFactory.get("users");
const messageRepository = RepositoryFactory.get("messages");

interface Params extends ParsedUrlQuery {
  toUid: string;
}

const Messages: NextPage = () => {
  const router = useRouter();
  
  const userGet = async (uuid: string) => {
    const res = await userRepository.get({
      params: {
        uuid: uuid,
      },
    });
    return res.data;
  };

  const messageGet = async () => {
    const res = await messageRepository.get({
      params: {
        
      }
    })
  }

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      return userGet(myUid).then((result) => {
        console.log(result);
      });
    });
  }, []);

  useEffect(() => {
    const toUid =
      typeof router.query.toUid === "string" ? router.query.toUid : null;
    if (toUid != null) {
      userGet(toUid).then((result) => {
        console.log(result);
      });
    }
  }, [router]);

  return (
    <div>
      <h1>messages</h1>
    </div>
  );
};

export default Messages;
