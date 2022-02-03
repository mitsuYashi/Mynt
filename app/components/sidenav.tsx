import type { NextPage } from "next";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";

type props = {
  userType: string;
};

const SideNav: NextPage<props> = ({ userType }) => {
  return (
    <div>
      <div>
        <a href="/home">
          <Image
            src="/images/logo.png"
            width={100}
            height={100}
            alt="アイコン"
          />
        </a>
      </div>
      <div>
        <a href="/home">HOME</a>
      </div>
      <div>
        <a href="/search">SEARCH</a>
      </div>
      {userType == "client" ? (
        <div>
          <a href="/favorite">FAVORITE</a>
        </div>
      ) : (
        <div>
          <a href="/review">REVIEW</a>
        </div>
      )}
      <div>
        <a href="/profile">PROFILE</a>
      </div>
    </div>
  );
};

export default SideNav;

// 画像の表示方法 https://maku.blog/p/fw7gpx7/
