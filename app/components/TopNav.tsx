import type { NextPage } from "next";
import { css } from "@emotion/react";
import React from "react";
import Search from "./Search";

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
    /* box-shadow: -2px 2px 1px 1px #ccc; */
    border: 1px solid #eaedf2;
    /* border-right: #fff; */
    margin: 0;
    background-color: #fff;
  `,
  h2: css`
    margin-left: 80px;
    font-size: 32px;
  `,
};


const TopNav: NextPage<Props> = ({ currentpage, props}: any) => {
  const search = props;
  return (
    <div css={classes.topNavFixed}>
      <div css={classes.topNav}>
        <h2 css={classes.h2}>{currentpage}</h2>
        <Search search={search}/>
      </div>
    </div>
  );
};

export default TopNav;
