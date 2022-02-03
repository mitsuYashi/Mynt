import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import TopNav from "./TopNav";
import SideNav from "./SideNav";
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
            <header>
                <SideNav userType={userType} />
                <TopNav currentpage={pageTitle}/>
            </header>
            <main>{children}</main>
        </>
    )
}

export default Layout;