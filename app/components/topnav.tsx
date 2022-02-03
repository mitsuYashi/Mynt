import type { NextPage } from "next";
import { useEffect, useState } from "react";
import React from 'react';
import Image from 'next/image';

type Props = {
    currentpage: string;
}

const TopNav: NextPage<Props> = ({currentpage}) => {

    const searchButton = () => {
        console.log("検索処理");
    }

    return (
        <div>
            <div><a href="#"><Image src="/images/########" width={100} height={100} alt="ページのアイコン" /></a></div>
            
            <div><h1>{currentpage}</h1></div>
            
            <div><input type="text" placeholder="検索条件" /></div>
            <div><button onClick={searchButton}>検索</button></div>
        </div>
    );
};

export default TopNav;