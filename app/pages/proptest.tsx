// テスト用ファイル
// テスト用ファイル
// テスト用ファイル
// テスト用ファイル
// テスト用ファイル
// テスト用ファイル
// テスト用ファイル
// テスト用ファイル
// テスト用ファイル
// テスト用ファイル

import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";


import {firebase, listenAuthState} from "../components/firebase";
import Topnav from "../components/topnav";

interface State {
  num: number[];
}

const initialState: State = {
  num: [],
};

const Proptest: NextPage = () => {
  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
        console.log(uid);
    });
  }, []);

  const home = "homehomehome";

  return (
    <div>
      <h1>home</h1>
      <Topnav currentpage={home} />
    </div>
  );
};

export default Proptest;
