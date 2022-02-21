import { css } from "@emotion/react";
import React from "react";

type Props = {
  userData: {
    name: string;
    birth: string;
    profile: string;
    user_id: string;
  };
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

    width: 68vw;
    /* margin: 0 1vw 0 auto; */
    margin: 0 auto;
    border-radius: 12px;

    z-index: 0;
  `,
  coverImg: css`
    position: relative;
    width: 100%;
    height: 125px;
    background-color: #7ec9c1;
    border-radius: 12px 12px 0 0;
  `,
  profImg: css`
    position: relative;
    top: 50%;
    left: 50px;
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #fff;
  `,
};

const ClientProfileDisplay: React.FC<Props> = ({ userData }) => {
  return (
    <div></div>
  );
};

export default ClientProfileDisplay;
