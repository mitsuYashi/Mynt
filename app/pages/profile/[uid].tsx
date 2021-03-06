import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import Layout from "../../components/Layout";
import { firebase, listenAuthState } from "../../components/firebase";
import ProfileDisplay from "../../components/pages/profile/ProfileDisplay";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const userRepository = RepositoryFactory.get("users");

type State = {
  userData: {
    name: string;
    birth: string;
    profile: string;
    url: string;
    user_id: string;
  };
};

const initialState: State = {
  userData: {
    name: "",
    birth: "",
    profile: "",
    url: "",
    user_id: "",
  },
};

const Profile: NextPage = () => {
  const router = useRouter();
  const [myuid, setMyuid] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [userData, setUserData] = useState(initialState.userData);
  
  const userGet = async (uid: string) => {
    const res = await userRepository.get({
      params: {
        uuid: uid,
      },
    });
    setUserData(res.data.user);
    setUserType(res.data.userType);
  };

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      setMyuid(uid);
    });
    typeof router.query.uid === "string" ? userGet(router.query.uid) : null;
  }, [router]);

  return (
    <Layout pageTitle="PROFILE" userType="client">
      {userData?.user_id != null ? (
        <ProfileDisplay userData={userData} userType={userType} myuid={myuid} />
      ) : null}
    </Layout>
  );
};

export default Profile;
