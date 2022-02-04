import type { NextPage } from "next";
import React from "react";
import Image from "next/image";
import SideNavMenu from "./SideNavMenu";
import { css } from '@emotion/react'
import Link from "next/link";
import { useEffect, useState } from "react";

type props = {
  userType: string;
};

const SideNav: NextPage<props> = ({ userType }) => {
  return (
    <div css={sideNavBody} className="sideNav">
      <div css={logo}>
        <Link href="/home">
          <a css={a}>
            <Image
              src="/images/logo.svg"
              width={250}
              height={75}
              alt="ロゴ"
            />
          </a>
        </Link>
      </div>

      <ul css={ul}>
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
          pageLink="/profile"
        />
      </ul>
    </div>
  );
};

const sideNavBody = css({
  width: '25%',
  minWidth: '250px',
  height: '100vh',
  position: 'fixed',
  top: '0%',
  left: '0%',
  borderRadius: '0 1rem 1rem 0',
  backgroundColor: '#fff'
});

const logo = css({
  display: 'flex',
  justifyContent: 'center'
});

const a = css({
  display: 'inline-block',
  height: '75px'
})

const ul = css({
  paddingLeft: '64px'
});

export default SideNav;

// 画像の表示方法 https://maku.blog/p/fw7gpx7/
