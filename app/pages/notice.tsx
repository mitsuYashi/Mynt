import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import Layout from "../components/Layout";

const Notice: NextPage = () => {

    const pageTitle: string = 'Notice';

    return (
        <Layout pageTitle={pageTitle}>
            
        </Layout>
    );
};

export default Notice;