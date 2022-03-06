import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
const userRepository = RepositoryFactory.get("users");

import { firebase, listenAuthState } from "../components/firebase";

import Layout from "../components/Layout";
import ClientHomeDisplay from "../components/pages/home/ClientHomeDisplay";
import MentaHomeDisplay from "../components/pages/home/MentaHomeDisplay";

interface State {
  num: number[];
}

type UserData = {
  user_id: string;
  name: string;
  birth: string;
  userType: string;
};

type MentaData = {
  user_id: string;
  name: string;
  birth: string;
  profile: string;
  url: string;
  userType: string;
};

const Home: NextPage /*<users, menta>*/ = () => {
  const [userdata, setUserdata] = useState<UserData | null>(null);
  const [mentadata, setMentadata] = useState<MentaData | null>(null);

  const [userType, setUserType] = useState("");

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      userGet(uid);
    });
  }, []);

  const userGet = async (uuid: string) => {
    try {
      const res = await userRepository.get({
        params: {
          uuid: uuid,
        },
      });
      console.log(res.data)
      setUserdata(res.data.user);
      setUserType(res.data.userType);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle="HOME" userType="client">
      {userType == "client" ? (
        <ClientHomeDisplay />
      ) : userType == "menta" ? (
        <MentaHomeDisplay />
      ) : null}
    </Layout>
  );
};

export default Home;
