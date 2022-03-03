import { css } from "@emotion/react";
import { Avatar, Button } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "../components/firebase";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const clientRepository = RepositoryFactory.get("clients");
const mentaRepository = RepositoryFactory.get("menta");

const classes = {
  background: css`
    width: 90vw;
    min-height: 80vh;
    /* height: 90vh; */
    margin: 30px auto;
    background-color: #fff;
    border-radius: 12px;
  `,
  imgCenter: css`
    width: 450px;
    padding: 30px 0 0 0;
    margin: 0px auto;
  `,
  block: css`
    position: relative;
    height: 400px;
  `,
  header: css`
    position: absolute;
    width: 40vw;
    top: 30px;
    /* left: 10vw; */
    /* margin: 50px 0 0 10vw; */
    font-size: 2.3rem;
    font-weight: bold;
  `,
  para: css`
    top: 160px;
    /* left: 20vw; */
    font-size: 1.7rem;
  `,
  larningImg: css`
    position: absolute;
    /* right: 10vw; */
  `,
  button: css`
    position: absolute;
    /* right: 46vw; */
    top: 250px;
    width: 220px;
    height: 50px;
    background-color: "#fff";
    &:hover {
      background: "#fff";
      box-shadow: "0 0 6px #4285f4";
    }
  `,

  posAbso: css`
    position: absolute;
  `,
};

const Home: NextPage = () => {
  const clientPost = async (uid: string, mail: string, username: string) => {
    const createResponse = await clientRepository.post({
      client: {
        uuid: uid,
        mail: mail,
        name: username,
      },
    });
  };
  const mentaPost = async (uid: string, mail: string, username: string) => {
    const createResponse = await mentaRepository.post({
      menta: {
        uuid: uid,
        mail: mail,
        name: username,
      },
    });
  };

  const clientButton = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential == null) {
        } else {
          const token = credential.accessToken;
          const user = result.user;
          clientPost(
            user.uid,
            user.email ? user.email : "",
            user.displayName ? user.displayName : "unknown"
          );
          Router.push("/profile");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const mentaButton = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential == null) {
        } else {
          const token = credential.accessToken;
          const user = result.user;
          mentaPost(
            user.uid,
            user.email ? user.email : "",
            user.displayName ? user.displayName : "unknown"
          );
          Router.push("/profile");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div css={classes.background}>
        <div css={classes.imgCenter}>
          <Image src="/images/logo.svg" width={450} height={135} alt="ロゴ" />
        </div>
        <div css={classes.block}>
          <h2 css={classes.header} style={{ left: "10vw" }}>
            あなただけのMENTAを見つけよう
          </h2>
          <p css={[classes.posAbso, classes.para]} style={{ left: "20vw" }}>
            My MENTA ――
          </p>
          <div css={classes.larningImg} style={{ right: "10vw" }}>
            <Image src="/images/Webinar-rafiki.svg" width={400} height={400} />
          </div>
          <div css={classes.posAbso} style={{ top: "225px", left: "20vw" }}>
            ユーザー登録
          </div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={
              <Avatar
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                }
              />
            }
            style={{ textTransform: "capitalize", left: "20vw" }}
            css={classes.button}
            onClick={clientButton}
          >
            Sign up with Google
          </Button>
        </div>

        <div css={classes.block}>
          <h2 css={classes.header} style={{ right: "6vw" }}>
            あなたのできるを届けよう
          </h2>
          <p css={[classes.posAbso, classes.para]} style={{ right: "20vw" }}>
            ―― Your MENTA
          </p>
          <div css={classes.larningImg} style={{ left: "10vw" }}>
            <Image src="/images/Recording-amico.svg" width={400} height={400} />
          </div>
          <div css={classes.posAbso} style={{ top: "225px", right: "20vw" }}>
            MENTAとして登録
          </div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={
              <Avatar
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                }
              />
            }
            style={{ textTransform: "capitalize", right: "20vw" }}
            css={classes.button}
            onClick={mentaButton}
          >
            Sign up with Google
          </Button>
        </div>
        <div css={classes.block}>
          <h2>ひとりぼっちじゃない</h2>
          <p>あなたの興味のあることを、</p>
          <p>あなただけでは終わらせない。</p>
          <p>ひとりじゃわからない、できないもの</p>
          <p></p>
          <p></p>
        </div>
      </div>
      <footer>
        <div
          style={{
            width: "100px",
            margin: "0px auto",
            padding: "0px 0 10px 0",
          }}
        >
          &copy;Mynt
        </div>
        <div
          style={{
            width: "250px",
            margin: "0px auto",
            padding: "0px 0 10px 0",
          }}
        >
          <a href="https://storyset.com/people" target="_blank" style={{}}>
            People illustrations by Storyset
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
