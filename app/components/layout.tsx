import type { NextPage } from "next";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { css } from '@emotion/react'

import axios from "axios";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from 'next/head';

const siteTitle = 'Mynt';

type Props = {
    userType: string;
    pageTitle: string;
}

const Layout: NextPage<Props> = ({userType, pageTitle, children}: any) => {
    return (
        <>
            {/* <Head>
                <link rel="icon" href='/favicon.ico'/>
                <title>{siteTitle}</title>
            </Head> */}
            <div css={bodyContent}>
                <SideNav userType={userType} />
                <div className="mainContent">
                    <TopNav currentpage={pageTitle}/>
                    <main>{children}</main>
                </div>
            </div>
        </>
    )
}

const bodyContent = css({
    backgroundColor: '#EAEDF2',
    width: '100vw',
    minWidth: '1080px',
    height: '100vh'
});

export default Layout;