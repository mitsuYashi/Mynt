import { css } from "@emotion/react";
import React from "react";
import ClientProfileDisplay from "./ClientProfileDisplay";
import MentaProfileDisplay from "./MentaProfileDisplay";
import MyProfileDisplay from "./MyprofileDisplay";

type Props = {
  userData: {
    name: string;
    birth: string;
    profile: string;
    url: string;
    user_id: string;
  };
  userType: string;
  myuid: string;
};

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
    margin: 0 0 0 auto;
    border-radius: 12px 0 0 12px;

    width: 68vw;
    /* margin: 0 1vw 0 auto; */
    margin: 0 auto;
    border-radius: 12px;

    z-index: 0;
  `,
  coverImg: css`
    width: 100%;
    height: 125px;
    background-color: #7ec9c1;
    border-radius: 12px 12px 0 0;
  `,
  profImg: css`
    position: relative;
    top: 35%;
    left: 50px;
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #fff;
  `,
  name: css`
    position: relative;
    top: -45%;
    left: 200px;
    width: 70%;
    font-size: 2rem;
    color: #fff;
  `,
  back: css`
    padding: 50px 0 20px 0;
    background-color: #ffffff;
    border-radius: 12px;
  `,
};

const ProfileDisplay: React.VFC<Props> = ({ userData, userType, myuid }) => {
  return (
    <div css={classes.main}>
      <div css={classes.coverImg}>
        <img
          src="../images/user.jpg"
          alt=""
          width="1"
          height="1"
          css={classes.profImg}
        />
        {/* {console.log(userData)} */}
        <div css={classes.name}>{userData.name}</div>
      </div>
      <div css={classes.back}>
        {myuid == userData.user_id ? (
          <MyProfileDisplay userData={userData} userType={userType} />
        ) : userType == "client" ? (
          <ClientProfileDisplay userData={userData} />
        ) : userType == "menta" ? (
          <MentaProfileDisplay userData={userData} />
        ) : null}
      </div>
    </div>
  );
};

export default ProfileDisplay;
