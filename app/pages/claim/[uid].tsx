import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { css } from "@emotion/react";
import { Button, Chip, TextField } from "@mui/material";

import { RepositoryFactory } from "../../repositories/RepositoryFactory";
import { firebase, listenAuthState } from "../../components/firebase";
const contractRepository = RepositoryFactory.get("contracts");
const userRepositpry = RepositoryFactory.get("users");

const classes = {
  main: css`
    overflow: hidden;
    background-color: #ffffff;
    position: relative;
    top: 125px;
    right: 0%;
    min-height: 80vh;
    min-width: 655px;
    width: 68vw;
    margin: 0 auto 10px auto;
    border-radius: 12px;
    z-index: 0;
  `,
  card: css`
    display: flex;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  flex: css`
    margin: 40px 0 0 0;
    display: flex;
    width: 50%;
    height: 60vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  `,
  buttons: css`
    width: 300px;
    padding: 50px 0 0 0;
    margin: 0px 0 0 0;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
  `,
};

const Claim: NextPage = () => {
  const router = useRouter();

  const [myuid, setMyuid] = useState("");
  const [touid, setTouid] = useState("");
  const [price, setPrice] = useState("");
  const [toName, setToName] = useState("");
  const [contractId, setContractId] = useState(0);

  useEffect(() => {
    const toUid =
      typeof router.query.uid == "string" ? router.query.uid : null;
      console.log(router)
    userGet(toUid ? touid : "");
    setTouid(toUid ? toUid : "");
  }, [router]);

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      setMyuid(uid);
    });
  }, []);

  const contractGet = async () => {
    try {
      const res = await contractRepository.get({
        params: {
          client_id: myuid,
        },
      });
      setContractId(res.data.id);
      setPrice(res.data.price);
    } catch (err) {
      console.log(err);
    }
  };

  const userGet = async (toUid: string) => {
    try {
      const res = await userRepositpry.get({
        params: {
          uuid: toUid,
        },
      });
      console.log(res.data);
      setToName(res.data.user.name);
    } catch (err) {
      console.log(err);
    }
  };

  const contractPost = async () => {
    try {
      const res = await contractRepository.update(contractId, {
        contract: {
          status: "success",
        },
      });
      Router.back();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    contractGet();
  }, [myuid]);

  return (
    <Layout userType={"client"} pageTitle={"CLAIM"}>
      <div css={classes.main}>
        <div css={classes.card}>
          <form css={classes.flex}>
            <TextField
              id="outlined"
              label="card number"
              placeholder="0000 0000 0000 0000"
              type="number"
              inputProps={{ maxLength: 16 }}
            />
            <TextField id="outlined" label="name" />
            <TextField id="outlined" label="date" placeholder="mm/yy" />
            <TextField
              id="outlined"
              label="security code"
              type="password"
              placeholder="●●●"
            />
            <Button
              onClick={() => {
                Router.back();
              }}
            >
              戻る
            </Button>
          </form>
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid #555",
              maxHeight: "300px",
              margin: "10% auto",
              width: "300px",
              padding: "30px 0",
              // textDecoration: "underline",
              // lineHeight: "0",
              fontSize: "1.7rem",
              // fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <p>請求金額</p>
            
            <p>{`${toName}`}</p>
            <br />
            <p style={{fontWeight: "bold"}}>{`¥${price}`}</p>
            <div css={classes.buttons}>
              <Button
                variant="contained"
                onClick={() => {
                  contractPost();
                }}
              >
                確定
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Claim;
