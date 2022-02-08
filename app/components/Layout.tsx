import type { NextPage } from "next";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { css } from "@emotion/react";

import axios from "axios";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";

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
    height: 100vh;
  `,
};

const Layout: NextPage<Props> = ({ userType, pageTitle, children }: any) => {
  return (
    <>
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
      </Head> */}
      <div css={classes.bodyContent}>
        <SideNav userType={userType} />
        <div className="mainContent">
          <TopNav currentpage={pageTitle} />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
