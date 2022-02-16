import type { NextPage } from "next";
import React from "react";
import Image from "next/image";
import SideNavMenu from "./SideNavMenu";
import { css } from "@emotion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type props = {
  userType: string;
  uid: string;
};

const classes = {
  sideNavBody: css`
    width: 25%;
    min-width: 250px;
    height: 100vh;
    position: fixed;
    top: 0%;
    left: 0%;
    border-radius: 0 1rem 1rem 0;
    background-color: #fff;
  `,
  center: css`
    display: flex;
    justify-content: center;
  `,
  a: css`
    display: inline-block;
    height: 75px;
  `,
  ul: css`
    padding: 0;
    min-width: 170px;
  `,
};

const SideNav: NextPage<props> = ({ userType, uid }) => {
  return (
    <div css={classes.sideNavBody} className="sideNav">
      <div css={classes.center}>
        <Link href="/home">
          <a css={classes.a}>
            <Image src="/images/logo.svg" width={250} height={75} alt="ロゴ" />
          </a>
        </Link>
      </div>

      <div css={classes.center}>
        <ul css={classes.ul}>
          <SideNavMenu
            pageTitle="HOME"
            pageIcon="/images/homeIcon.png"
            pageLink="/home"
          />

          <SideNavMenu
            pageTitle="SEARCH"
            pageIcon="/images/searchIcon.png"
            pageLink="/search"
          />

          {userType == "client" ? (
            <SideNavMenu
              pageTitle="FAVORITE"
              pageIcon="/images/favoriteIcon.png"
              pageLink="/favorite"
            />
          ) : (
            <SideNavMenu
              pageTitle="REVIEW"
              pageIcon="/images/reviewIcon.png"
              pageLink="/review"
            />
          )}

          <SideNavMenu
            pageTitle="PROFILE"
            pageIcon="/images/profileIcon.png"
            pageLink={`/profile/${uid != null ? uid: null}`}
          />
        </ul>
      </div>
    </div>
  );
};

export default SideNav;

// 画像の表示方法 https://maku.blog/p/fw7gpx7/
