import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
const homeRepository = RepositoryFactory.get("home");
const likeRepository = RepositoryFactory.get("like");
const noneRepository = RepositoryFactory.get("nones");

import Image from "next/image";
import { css } from "@emotion/react";

import { firebase, listenAuthState } from "../../firebase";
import { Button, ButtonGroup, Chip, IconButton } from "@mui/material";
import ReactMarkdown from "react-markdown";
import {
  DeleteOutline,
  Favorite,
  StarBorderOutlined,
} from "@mui/icons-material";

const classes = {
  main: css`
    background-color: #ffffff;
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
  grid: css`
    display: grid;
    grid-column-start: 1;

    grid-template-columns: 150px 1fr;
    grid-template-areas:
      "a b"
      "a c";
    /* grid-template-rows: 75px 75px; */
    /* grid-auto-rows: 100px; */
  `,
  header: css`
    width: 90%;
    padding: 15px 0 0 0;
    margin: 0px auto 0 auto;
  `,
  gridItem1: css`
    grid-area: a;
    /* width: 150px;
    height: 150px; */
    padding: 10px;
    border-radius: 50%;
  `,
  gridItem2: css`
    grid-area: b;
    font-size: 1.7rem;
    padding: 20px 0 0 0;
  `,
  gridItem3: css`
    grid-area: c;
  `,
  profile: css`
    width: 80%;
    margin: 0 auto;
  `,
  // bottonWrap: css`
  //   margin: 20px auto;
  //   width: 250px;
  // `,
  flex: css`
    width: 100%;
    padding: 30px;
    display: flex;
    justify-content: space-around;
    border-radius: 50px;
  `,
  noUser: css`
    position: relative;
    top: 25vh;
    font-size: 1.7rem;
    text-align: center;
  `,
};

interface State {
  num: number[];
}

type UserData = {
  user_id: string;
  name: string;
  birth: string;
};

type MentaData = {
  user_id: string;
  name: string;
  birth: string;
  profile: string;
  url: string;
};

type MentaTag =
  | {
      id: string;
      name: string;
    }[]
  | null;

const initialState: State = {
  num: [],
};

const ClientHomeDisplay: NextPage = () => {
  const [mentadata, setMentadata] = useState<MentaData | null>(null);
  const [mentatag, setMentatag] = useState<MentaTag>([]);
  const [userType, setUserType] = useState("");
  const [myuid, setMyuid] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      setMyuid(uid);
      return mentaGet(uid).then((result) => {
        console.log(result);
      });
    });
  }, []);

  const mentaGet = async (uuid: string) => {
    try {
      const res = await homeRepository.get({
        params: {
          uuid: uuid,
        },
      });
      console.log(res.data.tags);
      if (res.data.type == "like") {
        Router.push(`/messages/${res.data.user.menta_id}`);
      } else {
        setType(res.data.type);
        setMentadata(res.data.menta);
        setMentatag(res.data.tags);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nonePost = async () => {
    try {
      const res = await noneRepository.post({
        none: {
          client_id: myuid,
          menta_id: mentadata?.user_id,
        },
      });
      mentaGet(myuid);
    } catch (error) {
      console.log(error);
    }
  };

  const favoritePost = async () => {};

  const likePost = async () => {
    try {
      const res = await likeRepository.post({
        like: {
          client_id: myuid,
          menta_id: mentadata?.user_id,
          status: "true",
        },
      });
      console.log(res.data);
      Router.push(`/messages/${mentadata?.user_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={classes.main}>
      {type == "noUser" ? (
        <div css={classes.noUser}>
          <p>表示できるユーザーがいません</p>
          <p>検索機能をお試しください</p>
          <Button variant="outlined" style={{ margin: "30px 0" }} onClick={() => {Router.push("/search")}}>
            searchへ
          </Button>
        </div>
      ) : type == "home" ? (
        <>
          <div css={classes.header}>
            <div css={classes.grid}>
              <div css={classes.gridItem1}>
                <img
                  src="/images/user.svg"
                  width={130}
                  height={130}
                  style={{ borderRadius: "50%", border: "1px solid #eaedf2" }}
                />
              </div>
              <div css={classes.gridItem2}>
                {mentadata?.name ?? "Loading..."}
              </div>
              <div css={classes.gridItem3}>
                {mentatag?.map((val, index) => {
                  return (
                    <Chip
                      variant="outlined"
                      label={`${val.name}`}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div css={classes.profile}>
            <ReactMarkdown>{mentadata?.profile ?? "Loading..."}</ReactMarkdown>
            {mentadata?.url != null ? (
              <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/${mentadata?.url}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : null}
          </div>
          <div>
            <div css={classes.flex}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <IconButton
                  size="large"
                  onClick={nonePost}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <DeleteOutline fontSize="inherit" />
                </IconButton>
                {/* <IconButton
                  size="large"
                  onClick={favoritePost}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <StarBorderOutlined fontSize="inherit" />
                </IconButton> */}
                <IconButton
                  size="large"
                  onClick={likePost}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Favorite fontSize="inherit" />
                </IconButton>
              </ButtonGroup>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ClientHomeDisplay;
