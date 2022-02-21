import { NextPage } from "next";
import Router from "next/router";
import React, { useEffect } from "react";
import { firebase, listenAuthState } from "../components/firebase";
import Layout from "../components/Layout";

const ProfilePost: NextPage = () => {
  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      uid != "" ? Router.push(`/profile/${uid}`) : null;
    });
  }, []);

  return (
    <Layout pageTitle="PROFILE" userType="client">
      {/* <p>読み込み中</p> */}
    </Layout>
  );
};

export default ProfilePost;
