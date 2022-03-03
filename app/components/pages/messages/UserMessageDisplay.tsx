import { Button, Chip, Dialog } from "@mui/material";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { css } from "@emotion/react";
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
import ClientButtons from "../../modules/messages/ClientButtons";
import MentaButtons from "../../modules/messages/MentaButtons";

const userRepository = RepositoryFactory.get("users");

type Props = {
  sendProfile: {
    user_id: string;
    name: string;
    birth: string;
    profile: string;
    url: string;
  };
  tag: {
    name: string;
    id: number;
  }[];
  myuid: string;
};

const classes = {
  flex: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    margin: 20px 0;
  `,
  profile: css`
    overflow-y: scroll;
    height: 65vh;
  `,
};

const ClientMessageDisplay: React.FC<Props> = ({ myuid, sendProfile, tag }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openURL, setOpenURL] = useState(false);
  const [userType, setUserType] = useState("");

  const userGet = async () => {
    const res = await userRepository.get({
      params: {
        uuid: myuid,
      },
    });
    console.log(res.data);
    setUserType(res.data.userType);
  };

  const getAge = () => {
    const today = new Date();
    const birthday = new Date(sendProfile?.birth);
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

  useEffect(() => {
    userGet();
  }, [myuid]);

  return (
    <div style={{ padding: "10px" }}>
      <div css={classes.profile}>
        <div css={classes.flex}>
          <img
            src="/images/user.svg"
            width={100}
            height={100}
            alt="ロゴ"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <div style={{ fontSize: "1.2rem" }}>{sendProfile?.name}</div>
            <br />
            {getAge()}歳
          </div>
        </div>
        {tag?.map((str, index) => {
          return (
            <Chip
              style={{ border: "1px solid #555" }}
              label={str.name}
              key={index}
            />
          );
        })}
        {openProfile === false ? (
          <>
            <ReactMarkdown>
              {(sendProfile?.profile).substring(0, 30) + "..."}
            </ReactMarkdown>
            <Button
              onClick={() => {
                setOpenProfile(true);
              }}
            >
              全文表示する
            </Button>
          </>
        ) : (
          <>
            <ReactMarkdown>{sendProfile?.profile}</ReactMarkdown>
            <Button
              onClick={() => {
                setOpenProfile(false);
              }}
            >
              閉じる
            </Button>
          </>
        )}
        <br />
        {sendProfile.url != null ? (
          <Button
            onClick={() => {
              setOpenURL(true);
            }}
          >
            動画を表示する
          </Button>
        ) : null}
        <Dialog
          open={openURL}
          onClose={() => {
            setOpenURL(false);
          }}
          keepMounted
          fullWidth={true}
          maxWidth="md"
        >
          <iframe
            width="100%"
            height="480"
            src={`https://www.youtube.com/embed/${sendProfile?.url}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Dialog>
      </div>
      {
        userType == "client" ?
          <ClientButtons myuid={myuid} sendProfile={sendProfile} />
        : userType == "menta" ?
          <MentaButtons myuid={myuid} sendProfile={sendProfile} />
        : null
      }
    </div>
  );
};

export default ClientMessageDisplay;
