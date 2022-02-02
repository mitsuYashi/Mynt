import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FormEventHandler, useEffect, useRef, useState } from "react";
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
};

const Messages: NextPage = () => {
  const router = useRouter();
  const messageRef = useRef<HTMLInputElement>(null);
  const [myUid, setMyuid] = useState("");
  const [toUid, setToUid] = useState("");
  const [myProfile, setMyprofile] = useState([]);
  const [sendProfile, setSendProfile] = useState([]);
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
    // console.log(res.data);
    res.data === "" ? router.push("../home") : null;
    setMyprofile(res.data.myProfile);
    setSendProfile(res.data.sendProfile);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (messageRef.current?.value != null && messageRef.current.value != "") {
      addMessage(myUid, toUid, messageRef.current?.value);
      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      setMyuid(myUid);
    });
  }, []);

  useEffect(() => {
    // if (myUid != null && toUid != null) {
    //   getMessage(myUid, toUid).then((data) => {
    //     const result: messages[] = data.sort((a: messages, b: messages) => {
    //       return a.created_at.seconds < b.created_at.seconds ? -1 : 1;
    //     });
    //     setMessages(result);
    //     // console.log(result != null ? result : null);
    //   });
    // }
  }, [myUid, toUid]);

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
    <div>
      <h1>messages</h1>
      <div>
        <div>
          {/* {console.log(messages)} */}
          {messages.map((str, index) => {
            return <p key={index}>{str.message}</p>;
          })}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={messageRef} />
        <input type="submit" value="送信" />
      </form>
    </div>
  );
};

export default Messages;
