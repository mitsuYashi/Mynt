import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import Topnav from "../components/topnav";
import Sidenav from "../components/sidenav";

const Notice: NextPage = () => {

    const pageTitle: string = 'Notice';

    return (
        <div className="wrapper">
            <Topnav currentpage={pageTitle} />
            <Sidenav/>
        </div>
    );
};

export default Notice;