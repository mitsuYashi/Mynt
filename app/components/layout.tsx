import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import Topnav from "./Topnav";
import Sidenav from "./Sidenav";
import Head from 'next/head';

const siteTitle = 'Mynt';

type Props = {
    pageTitle: string;
}

const Layout: NextPage<Props> = ({children, pageTitle}: any) => {
    return (
        <>
            <Head>
                <link rel="icon" href='/favicon.ico'/>
                <title>{siteTitle}</title>
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