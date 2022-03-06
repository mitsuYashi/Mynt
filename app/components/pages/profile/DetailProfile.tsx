import { css } from "@emotion/react";
import { Favorite } from "@mui/icons-material";
import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
import { firebase, listenAuthState } from "../../firebase";

const tagRepository = RepositoryFactory.get("tags");
const userRepository = RepositoryFactory.get("users");
const likeRepository = RepositoryFactory.get("like");

type Props = {
  userData: {
    name: string;
    birth: string;
    profile: string;
    user_id: string;
    url: string;
  };
  userType: string;
};

type State = {
  tags:
    | {
        name: string;
        id: number;
      }[]
    | null;
};

const classes = {
  main: css`
    background-color: #ffffff;
    position: relative;
    top: 125px;
    right: 0%;
    width: 70vw;
    min-height: 80vh;
    min-width: 655px;
    margin: 0 0 0 auto;
    border-radius: 12px 0 0 12px;

    z-index: 0;
  `,
  wrap: css`
    width: 80%;
    margin: 0 auto;
  `,
};

const DetailProfile: React.FC<Props> = ({ userData, userType }) => {
  const router = useRouter();
  const [tags, setTags] = useState<State["tags"]>(null);
  const [myuid, setMyuid] = useState("");
  const [myUserType, setMyUserType] = useState("");
  const [isLike, setIsLike] = useState("");

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      userGet(uid);
      getLike(uid);
    });
  }, []);

  const userGet = async (uuid: string) => {
    try {
      const res = await userRepository.get({
        params: {
          uuid: uuid,
        },
      });
      setMyuid(res.data.user.user_id);
      setMyUserType(res.data.userType);
    } catch (error) {
      console.log(error);
    }
  };

  const getLike = async (uid: string) => {
    try {
      const res = await likeRepository.get({
        params: {
          menta_id: uid,
        },
      });
      console.log(res.data);
      setIsLike(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTags = async () => {
    const res = await tagRepository.get({
      params: {
        uuid: userData.user_id,
      },
    });
    console.log(res.data);
    setTags(res.data.myTags);
  };

  useEffect(() => {
    getTags();
  }, [userData]);

  const getAge = () => {
    const today = new Date();
    const birthday = new Date(userData?.birth);
    let age = today.getFullYear() - birthday.getFullYear();
    const thisYearsBirthday = new Date(
      today.getFullYear(),
      birthday.getMonth() - 1,
      birthday.getDate()
    );
    if (today < thisYearsBirthday) {
      age--;
    }
    return age;
  };

  const likePost = async () => {
    try {
      const res = await likeRepository.post({
        like: {
          client_id: myuid,
          menta_id: userData?.user_id,
          status: "true",
        },
      });
      console.log(res.data);
      router.push(`/messages/${userData?.user_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={classes.wrap}>
      <div style={{ textAlign: "right", fontSize: "1.2rem" }}>{getAge()}歳</div>
      {tags?.map((tag, index) => {
        return <Chip variant="outlined" label={`${tag.name}`} key={index} />;
      })}
      <ReactMarkdown>{userData.profile}</ReactMarkdown>
      {userData.url != null ? (
        <iframe
          style={{ margin: "30px 0 0 0" }}
          width="100%"
          height="544"
          src={`https://www.youtube.com/embed/${userData.url}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0 0 0",
        }}
      >
        {myUserType == "client" && userType == "menta" ? (
          <IconButton
            size="large"
            onClick={likePost}
            color="primary"
            aria-label="upload picture"
            component="span"
            disabled={isLike == "exist"}
          >
            <Favorite fontSize="inherit" />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
};

export default DetailProfile;
