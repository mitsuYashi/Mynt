import type { NextPage } from "next";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { css } from "@emotion/react";

import axios from "axios";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { firebase, listenAuthState } from "./firebase";

const siteTitle = "Mynt";

type Props = {
  userType: string;
  pageTitle: string;
};

const classes = {
  bodyContent: css`
    background-color: #eaedf2;
    min-width: 670px;
    padding-left: 25%;
    height: 100%;
  `,
  mainContent: css`
    height: 100%;
  `,
};

const Layout: NextPage<Props> = ({ pageTitle, children }: any) => {
  const [myuid, setMyuid] = useState("");
  const [userType, setUserType] = useState("client");

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      setMyuid(myUid);
      
    });
  }, []);

  return (
    <>
      <nav>
        <SideNav userType={userType} uid={myuid != null ? myuid : ""} />
        <TopNav currentpage={pageTitle} />
      </nav>
      <div css={classes.bodyContent}>
        <main css={classes.mainContent}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
