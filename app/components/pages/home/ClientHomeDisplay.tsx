import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
const userRepository = RepositoryFactory.get("users");
const mentatagRepository = RepositoryFactory.get("menta_tags");
const usertagRepository = RepositoryFactory.get("users_tags");
const likeRepository = RepositoryFactory.get("like");
const noneRepository = RepositoryFactory.get("nones");

import Image from 'next/image';
import { css } from "@emotion/react";


import { firebase, listenAuthState } from "../../firebase";

const classes = {
  contentWrap: css`
  font-size: 1.2rem;
  background-color: #fff;
  width: 70vw;
  height: 80vh;
  min-width: 655px;
  position: fixed;
  right: 0%;
  top: 125px;
  border-radius: 12px 0 0 12px;
  box-shadow: -2px 2px 1px 1px #ccc;
  padding: 20px;
  `,
  table: css`
  width: 68vw;
  `,
  icontd: css`
  width: 150px;
  height: 150px;
  `,
  icon: css`
  `,
  mentaNametd: css`
  font-size: 1.5rem;
  border-bottom: 2px solid #bbb;
  `,
  tagtd: css`
  `,
  tagdiv: css`
  vertical-align: bottom;
  border-bottom: 2px solid #bbb;
  `,
  tags: css`
  display: inline-block;
  padding: 5px 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #bbb;
  border-radius: 20px;
  background-color: #eaedf2;
  box-shadow: -1px 1px 1px 1px #eee;
  `,
  url: css`
  padding: 5px 0 5px 0;
  `,
  prof: css`
  vertical-align: top;
  height: auto;
  padding-top: 5px;
  `,
  noneButton: css`
  position: absolute;
  bottom: 0px;
  left: 0px;
  `,
  likeButton: css`
  position: absolute;
  bottom: 0px;
  right: 0px;
  `
}



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

type MentaTag = {
  id: string,
  name: string
}[]

const initialState: State = {
  num: [],
};

const ClientHomeDisplay: NextPage/*<users, menta>*/ = () => {

  // let userdata: object = [];
  const [userdata, setUserdata] = useState<UserData | null>(null);
  console.log("u", userdata);
  const [mentadata, setMentadata] = useState<MentaData | null>(null);
  console.log("m", mentadata);
  const [mentatag, setMentatag] = useState<MentaTag | null>(null);

  const [userType, setUserType] = useState("");

  const [myuid, setMyuid] = useState("");

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      console.log(myUid);
      setMyuid(myuid);
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
      setMentatag(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const nonePost = async () => {
    console.log('none');
    const client_id = myuid;
    const menta_id = 'tIIermrOnEaqrKLjbsxKQUGGBC33';
    console.log(client_id, menta_id);
    try {
      const res = await noneRepository.post({
        none: {
          client_id: client_id,
          menta_id: menta_id,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async () => {
    console.log('like');
    const client_id = myuid;
    const menta_id = 'tIIermrOnEaqrKLjbsxKQUGGBC33';
    console.log(client_id, menta_id);
    try {
      const res = await likeRepository.post({
        like: {
          client_id: client_id,
          menta_id: menta_id,
          status: true,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

    return  (
    <div css={classes.contentWrap}>

          <div>
            <table css={classes.table}>
              <tr>
                <td rowSpan={2} css={classes.icontd}>
                    <Image css={classes.icon} src="/images/user.jpg" width={130} height={130} />
                </td>
                <td>
                  <div css={classes.mentaNametd}>
                    {mentadata?.name ?? "Loading..."}
                  </div>
                </td>
              </tr>
              <tr>
                <td css={classes.tagtd}>
                  <div css={classes.tagdiv}>
                    {mentatag!=null?mentatag.map((value) => (
                      <div css={classes.tags}><a href="#">{value.name}</a></div>
                    )):null}
                  </div>
                </td>
              </tr>
                <tr>
                  <td colSpan={2} css={classes.url}>
                    <iframe width="480" height="270" src={`https://www.youtube.com/embed/${mentadata?.url}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} css={classes.prof}>
                    {mentadata?.profile ?? "Loading..."}
                  </td>
                </tr>
            </table>
          {/* 非表示ボタン */}
          <div onClick={nonePost} css={classes.noneButton}>
            <Image src="/images/none.png" width={70} height={70} />
          </div>
          {/* LIKEボタン */}
          <div onClick={likePost} css={classes.likeButton}>
            <Image src="/images/like.png" width={70} height={70} />
          </div>
          </div>

    </div>
    );
};

export default ClientHomeDisplay;