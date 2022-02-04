import type { NextPage } from "next";
import { css } from '@emotion/react'
import React from 'react';
import { useEffect, useState } from "react";

type Props = {
    currentpage: string;
}

const TopNav: NextPage<Props> = ({currentpage}) => {
    return (
        <div className="topNav">
            <h1 css={h1}>{currentpage}</h1>
            <input type="text" placeholder="検索" />
        </div>
    );
};

const h1 = css({
    margin: '0'
})

export default TopNav;