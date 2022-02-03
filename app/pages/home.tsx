import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
const userRepository = RepositoryFactory.get("users");
const mentatagRepository = RepositoryFactory.get("menta_tags");
const usertagRepository = RepositoryFactory.get("users_tags");
const likeRepository = RepositoryFactory.get("like");
const noneRepository = RepositoryFactory.get("nones");


import { firebase, listenAuthState } from "../components/firebase";
import Topnav from "../components/topnav";
import Sidenav from "../components/sidenav";
import { getUnpackedSettings } from "http2";

interface State {
  num: number[];
}

type UserData = {
  user_id: string,
  name: string,
  birth: string,
}

type MentaData = {
  user_id: string,
  name: string,
  birth: string,
  profile: string,
  url: string
}

const initialState: State = {
  num: [],
};

const Home: NextPage/*<users, menta>*/ = () => {

  // let userdata: object = [];
  const [userdata, setUserdata] = useState<UserData | null>(null);
  console.log("u", userdata);
  const [mentadata, setMentadata] = useState<MentaData | null>(null);
  console.log("m", mentadata);

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      console.log(myUid);
      return userGet(myUid).then((result) => {
        console.log(result);
      });
    });
  }, []);

  const userGet = async (uuid: string) => {
    try {
      const res = await userRepository.get({
        params: {
          uuid: uuid,
        },
      });
      console.log(res.data);
      console.log(res.data.user.name);
      setUserdata(res.data.user);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const mentaId = 'tIIermrOnEaqrKLjbsxKQUGGBC33';
      const menta_id = mentaId;
      console.log(mentaId);
      return mentaGet(mentaId).then((result) => {
        console.log(result);
      }), mentatagGet(menta_id).then((result) => {
        console.log(result);
      });
    });
  }, []);


  const mentaGet = async (uuid: string) => {
    try {
      const res = await userRepository.get({
        params: {
          uuid: uuid,
        },
      });
      console.log(res.data);
      console.log(res.data.user.name);
      setMentadata(res.data.user);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const mentatagGet = async (menta_id: string) => {
    try {
      const res = await mentatagRepository.get({
        params: {
          menta_id: menta_id,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const None = () => {
    // 次のユーザーを表示
  };

  const Like = () => {
    // チャットに
  };

  const currentpage = "HOME";

  return (
    <div>
      <Topnav currentpage={currentpage} />
      <Sidenav />

      {/* データテスト */}
      <div>
        <div>{userdata?.name ?? "Loading..."}</div>
        <div>{userdata?.birth ?? "Loading..."}</div>
        <div>{userdata?.user_id ?? "Loading..."}</div>

        <div>{mentadata?.name ?? "Loading..."}</div>
        <div>{mentadata?.birth ?? "Loading..."}</div>
        <div>{mentadata?.profile ?? "Loading..."}</div>
        <div>{mentadata?.url ?? "Loading..."}</div>
        <div>{mentadata?.user_id ?? "Loading..."}</div>
      </div>

    {/* メインコンテンツ */}
      <div>
        {/* アイコン */}
        <div>/////アイコン/////</div>
        {/* メンタの名前 */}
        <div>{mentadata?.name ?? "Loading..."}</div>
        {/* タグのリスト */}
        <div>/////タグリスト/////</div>
        {/* 添付URL */}
        <div>{mentadata?.url ?? "Loading..."}</div>
        {/* プロフィール(ポートフォリオ) */}
        <div>{mentadata?.profile ?? "Loading..."}</div>
        {/* 非表示ボタン */}
        <div onClick={None}>非表示</div>
        {/* LIKEボタン */}
        <div onClick={Like}>LIKE</div>
      </div>

    </div>
  );
};

export default Home;