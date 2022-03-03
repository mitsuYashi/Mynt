import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Tooltip,
} from "@mui/material";
import Router from "next/router";

import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
const noneRepository = RepositoryFactory.get("nones");
const contractRepository = RepositoryFactory.get("contracts");

type Props = {
  sendProfile: {
    user_id: string;
    name: string;
    birth: string;
    profile: string;
    url: string;
  };
  myuid: string;
};

const ClientEndButton: React.FC<Props> = ({ myuid, sendProfile }) => {
  const [openNone, setOpenNone] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const [contractStatus, setContractStatus] = useState("");
  const [price, setPrice] = useState(0);

  const nonePost = async () => {
    try {
      const res = await noneRepository.post({
        none: {
          client_id: myuid,
          menta_id: sendProfile?.user_id,
        },
      });
      Router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const contractPost = () => {
    Router.push(`/claim/${sendProfile.user_id}`);
    // try {
    //   const res = await contractRepository.put({
    //     contract: {
    //       client_id: myuid,
    //       menta_id: sendProfile?.user_id,
    //     },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const contractGet = async () => {
    try {
      const res = await contractRepository.get({
        params: {
          client_id: myuid,
        },
      });
      setContractStatus(res.data.status);
      setPrice(res.data.price);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    contractGet();
  }, [myuid]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "30px auto 0 0",
      }}
    >
      <Tooltip title="MENTAが確定した場合押せるようになります" placement="top">
        <span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenContract(true);
            }}
            disabled={contractStatus != "unpaid"}
          >
            MENTA依頼
          </Button>
        </span>
      </Tooltip>
      <Dialog
        open={openContract}
        onClose={() => {
          setOpenContract(false);
        }}
        keepMounted
        fullWidth
      >
        <Stack direction="row" spacing={1}>
            <DialogTitle id="alert-dialog-title">
            {`${sendProfile.name} さんに依頼しますか`}
            <Chip style={{position: "relative", right: "-250px"}} label={`¥${price}`} color="primary" variant="outlined" />
            </DialogTitle>
        </Stack>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            請求画面へ移動します
            <br />
            請求についての不明点はご依頼前にMENTAに確認ください。
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenContract(false);
            }}
          >
            チャットに戻る
          </Button>
          <Button
            onClick={() => {
              setOpenContract(false);
              contractPost();
            }}
            autoFocus
            color="error"
          >
            請求画面へ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientEndButton;
