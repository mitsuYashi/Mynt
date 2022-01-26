import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";


import {firebase, listenAuthState} from "../components/firebase";
import Topnav from "../components/topnav";
import Sidenav from "../components/sidenav";

interface State {
  num: number[];
}

const initialState: State = {
  num: [],
};

// テストデータ

const testuserdata: users = {
  id : 'testuser',
  uuid : '1234566789',
  name : 'ユーザー太郎',
  mail : 'user@test',
  birth : new Date('2001-04-07'),
  status : true
};


type users =  {
  id : String,
  uuid : String,
  name : String,
  mail : String, 
  birth: Date,
  status : Boolean,
};

const testmentadata: menta = {
  id : 'testmanta',
  uuid : '987654321',
  name : 'メンタ花子',
  mail : 'menta@test',
  birth : new Date('2022-01-21'),
  profile : 'HAL名古屋に通っています',
  url : 'youtube.com',
  timestamp : new Date(),
  status : true
}

type menta = {
  id : String,
  uuid : String,
  name : String,
  mail : String,
  birth : Date,
  profile : String,
  url : String,
  timestamp : Date,
  status : Boolean
}

// テストデータ

const Home: NextPage<users, menta> = () => {

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
      <Sidenav />

      <h1>テストユーザー</h1>
      <div>{testuserdata.id}</div>
      <div>{testuserdata.uuid}</div>
      <div>{testuserdata.name}</div>
      <div>{testuserdata.mail}</div>
      <div>{testuserdata.birth.toString()}</div>
      <div>{testuserdata.status}</div>
      
      <h1>テストメンタ</h1>
      <div>{testmentadata.id}</div>
      <div>{testmentadata.uuid}</div>
      <div>{testmentadata.name}</div>
      <div>{testmentadata.mail}</div>
      <div>{testmentadata.birth.toString()}</div>
      <div>{testmentadata.profile}</div>
      <div>{testmentadata.url}</div>
      <div>{testmentadata.timestamp.toString()}</div>
      <div>{testmentadata.status}</div>

    </div>
  );
};

export default Home;
