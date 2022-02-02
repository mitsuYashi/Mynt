import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import Topnav from "../components/topnav";
import Sidenav from "../components/sidenav";
import Head from 'next/head';
import { type } from "os";

export const siteTitle = 'Mynt';

type Props = {
    siteTitle: string;
}

const Layout: NextPage<Props> = ({children, pageTitle}: any) => {
    return (
        <>
            <Head>
                <link rel="icon" href='/favicon.ico'/>
                <meta name='og:title' content={siteTitle} />
            </Head>
            <header>
                <Topnav currentpage={pageTitle}/>
                <Sidenav/>
            </header>
            <main>{children}</main>
        </>
    )
}

export default Layout;