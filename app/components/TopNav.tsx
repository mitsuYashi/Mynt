import type { NextPage } from "next";
import { css } from "@emotion/react";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import { useEffect, useState } from "react";

type Props = {
  currentpage: string;
};

const classes = {
  topNavFixed: css`
    width: 70vw;
    min-width: 655px;
    position: fixed;
    top: 20px;
    right: 0%;
    margin: 0;
    z-index: 1;
    `,
  topNav: css`
    width: 70vw;
    min-width: 655px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px 0 0 12px;
    box-shadow: -2px 2px 1px 1px #ccc;
    margin: 0;
    background-color: #fff;
  `,
  h2: css`
    margin-left: 80px;
    font-size: 32px;
  `,
  search: css`
    width: 30%;
    min-width: 230px;
    height: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 8%;
  `,
  input: css`
    width: 80%;
    min-width: 184px;
    height: 100%;
    border: none;
    border-radius: 32px;
    padding-left: 32px;
    background-color: #eaedf2;
  `,
  inputButton: css`
    height: 100%;
    border: none;
    background-color: #fff;
  `,
};

const TopNav: NextPage<Props> = ({ currentpage }) => {
  const searchButton: MouseEventHandler = (e) => {
    e.preventDefault();
    console.log("検索処理");
  };

  return (
    <div css={classes.topNavFixed}>
      <div css={classes.topNav}>
        <h2 css={classes.h2}>{currentpage}</h2>
        <form css={classes.search}>
          <input css={classes.input} type="text" placeholder="検索" />
          <button css={classes.inputButton} onClick={searchButton}>
            <Image src={"/images/searchIcon.png"} width={25} height={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopNav;
