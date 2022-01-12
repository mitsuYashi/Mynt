import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import {firebase, listenAuthState} from "../components/firebase";

interface State {
  num: number[];
}

const initialState: State = {
  num: [],
};

const Home: NextPage = () => {
  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
        console.log(uid);
    });
  }, []);

  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
