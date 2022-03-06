import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import Layout from "../../Layout";
import { firebase, listenAuthState } from "../../firebase";

import { css } from "@emotion/react";
import Image from "next/image";
import { ClassNames } from "@emotion/react";
import { Button, Chip } from "@mui/material";
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
import ReactMarkdown from "react-markdown";
import { async } from "@firebase/util";

const homeRepository = RepositoryFactory.get("home");
const noneRepository = RepositoryFactory.get("nones");

const classes = {
  main: css`
    position: relative;
    top: 125px;
    right: 0%;
    width: 70vw;
    height: 100%;
    min-height: 80vh;
    min-width: 655px;

    width: 68vw;
    margin: 0 auto 10px auto;
    border-radius: 12px;

    z-index: 0;
  `,
  cards: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    
    row-gap: 30px;
  `,
  card: css`
    padding: 10px;
    max-width: 20vw;
    /* height: 400px; */
    background-color: #fff;
    border-radius: 12px;
  `,
  itemCenter: css`
    margin: 10px 0;
    display: flex;
    justify-content: center;
  `,
  buttons: css`
    bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `,
};

type Clients =
  | {
      user_id: string;
      name: string;
      profile: string | null;
    }[]
  | null;
type Tags =
  | {
      name: string;
      client_id: string;
    }[]
  | null;

const MentaHomeDisplay: React.FC = () => {
  const [myUid, setMyUid] = useState("");
  const [clients, setClients] = useState<Clients>(null);
  const [tags, setTags] = useState<Tags>(null);

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      setMyUid(uid);
      getHome(uid);
    });
  }, []);

  const getHome = async (uid: string) => {
    try {
      const res = await homeRepository.get({
        params: {
          uuid: uid,
          userType: "menta",
        },
      });
      setClients(res.data.clients);
      setTags(res.data.tag_name);
    } catch (error) {
      console.log(error);
    }
  };

  const postNone = async (client_id: string) => {
    try {
      const res = await noneRepository.post({
        none: {
          menta_id: myUid,
          client_id: client_id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div css={classes.main}>
      <div css={classes.cards}>
        {clients?.map((val, index) => (
          <div css={classes.card} key={index}>
            <div css={classes.itemCenter}>
              <Image src="/images/user.svg" width={100} height={100} />
            </div>
            <div>
              <div style={{ fontSize: "1.7rem" }}>{val.name}</div>
              {tags?.map((tagVal, tagIndex) =>
                tagVal.client_id == val.user_id ? (
                  <Chip
                    style={{ border: "1px solid #555" }}
                    label={tagVal.name}
                    key={tagIndex}
                  />
                ) : null
              )}
            </div>
            {val.profile != null ? (
              <ReactMarkdown>
                {val.profile.substring(0, 20) + "..."}
              </ReactMarkdown>
            ) : null}
            <div css={classes.buttons}>
              <Button
                color="error"
                onClick={() => {
                  postNone(val.user_id);

                }}
              >
                マッチ解除
              </Button>
              <Button
                onClick={() => {
                  Router.push(`/messages/${val.user_id}`);
                }}
              >
                メッセージを送る
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentaHomeDisplay;
