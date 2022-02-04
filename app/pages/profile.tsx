import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import { firebase, listenAuthState } from "../components/firebase";

const Favorite: NextPage = () => {
  const [myUid, setMyUid] = useState("");

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      setMyUid(myUid);
    });
  }, []);

  return <Layout pageTitle="PROFILE" userType="client"></Layout>;
};

export default Favorite;