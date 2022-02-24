import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Router, { useRouter } from "next/router";

import {
  addMessage,
  db,
  firebase,
  listenAuthState,
} from "../../components/firebase";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import ClientMessageDisplay from "../../components/pages/messages/UserMessageDisplay";
import { css } from "@emotion/react";
import { TextField } from "@mui/material";

const userRepository = RepositoryFactory.get("users");
const messageRepository = RepositoryFactory.get("messages");

interface Params extends ParsedUrlQuery {
  toUid: string;
}

type messages = {
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  message: string;
  sendUid: string;
  uid: string;
  user: string;
};

type State = {
  user: {
    user_id: string;
    name: string;
    birth: string;
    profile: string;
  };
  tag: {
    name: string;
    id: number;
  }[];
  userType: string;
};

const classes = {
  main: css`
    overflow: hidden;
    background-color: #ffffff;
    position: relative;
    top: 125px;
    right: 0%;
    /* width: 70vw; */
    height: 100%;
    min-height: 80vh;
    min-width: 655px;

    width: 68vw;
    margin: 0 auto 10px auto;
    border-radius: 12px;

    z-index: 0;
  `,
  gridLayout: css`
    display: grid;
    grid-template-columns: 2fr 1fr;
  `,
  messageBack: css`
    /* width: 45%;
    height: 100%; */
    padding: 10px;
    border-radius: 12px;
    background-color: #fff;
  `,
  messageFlex: css`
    overflow-y: scroll;
    height: 500px;
  `,
  myMessage: css`
    display: block;
    overflow: hidden;
    min-width: 0;
    max-width: 60%;
    word-wrap: break-word;
    white-space: normal;
    padding: 0.4rem;
    margin: 0.4rem;
    margin-left: 40%;
    background-color: #7ec9c1;
    border-radius: 6px;
  `,
  sendMessage: css`
    display: block;
    overflow: hidden;
    min-width: 0;
    max-width: 60%;
    word-wrap: break-word;
    white-space: normal;
    padding: 0.4rem;
    margin: 0.4rem;
    margin-right: 40%;
    background-color: #89c997;
    border-radius: 6px;
  `,
};

const Messages: NextPage = () => {
  const router = useRouter();
  const messageRef = useRef<HTMLInputElement>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [myUid, setMyuid] = useState("");
  const [toUid, setToUid] = useState("");
  const [myProfile, setMyprofile] = useState([]);
  const [sendProfile, setSendProfile] = useState<State>();
  const [messages, setMessages] = useState<messages[]>([]);

  const userGet = async (uuid: string) => {
    const res = await userRepository.get({
      params: {
        uuid: uuid,
      },
    });
    return res.data;
  };

  const messageUserGet = async () => {
    const res = await messageRepository.get({
      params: {
        uid_first: myUid,
        uid_second: toUid,
      },
    });
    console.log(res.data);
    // res.data === "" ? router.push("../home") : null;
    setMyprofile(res.data.myProfile);
    setSendProfile(res.data.sendProfile);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    // if (messageRef.current?.value != null && messageRef.current.value != "") {
    //   addMessage(myUid, toUid, messageRef.current?.value);
    //   messageRef.current.value = "";
    // }

    if (newMessage != null && newMessage != "") {
      addMessage(myUid, toUid, newMessage);
      setNewMessage("");
    }
  };

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      setMyuid(myUid);
    });
  }, []);

  useEffect(() => {
    const toUid =
      typeof router.query.toUid === "string" ? router.query.toUid : null;
    setToUid(toUid ? toUid : "");
  }, [router]);

  useEffect(() => {
    // uidが取得済みの時、user情報をとってくる
    const res = myUid !== "" && toUid !== "" ? messageUserGet() : null;
    // リアルタイムアップデート
    if (res != null) {
      console.log(myUid);
      const userIds = [myUid, toUid].sort();
      const id = userIds[0] + userIds[1];
      const unsubscribe = onSnapshot(collection(db, id), (querySnapshot) => {
        const res: messages[] = querySnapshot.docs.map((doc) => {
          return doc.data() as messages;
        });
        const result: messages[] = res.sort((a: messages, b: messages) => {
          return a.created_at.seconds < b.created_at.seconds ? -1 : 1;
        });
        setMessages(result);
        console.log(result);
      });
      return unsubscribe;
    }
  }, [myUid, toUid]);

  return (
    <Layout userType="menta" pageTitle="MESSAGE">
      <div css={[classes.gridLayout, classes.main]}>
        <div css={classes.messageBack}>
          <div>
            <div css={classes.messageFlex}>
              {/* {console.log(messages)} */}
              {messages.map((str, index) => {
                console.log(str.user);
                return (
                  <div css={classes.myMessage} key={index}>
                    {str.message}
                  </div>
                );
              })}
              {/* <div css={classes.sendMessage}>aaaaaa</div> */}
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ borderTop: "1px solid #eee" }}>
            {/* <input type="text" ref={messageRef} /> */}
            <TextField
              id="standard-multiline-static"
              // label="Multiline"
              placeholder="メッセージを入力"
              rows={4}
              variant="standard"
              fullWidth
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  // エンターキー押下時の処理
                  (e.currentTarget as unknown as HTMLTextAreaElement).value =
                    "";
                }
              }}
              style={{ margin: "30px 0 0 0" }}
            />
            {/* <input type="submit" value="送信" /> */}
          </form>
        </div>
        {sendProfile != null ? (
          <ClientMessageDisplay
            sendProfile={sendProfile.user}
            tag={sendProfile.tag}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default Messages;
