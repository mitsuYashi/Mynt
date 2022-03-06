import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
import Router from "next/router";

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

const MentaButtons: React.FC<Props> = ({ myuid, sendProfile }) => {
  const [openNone, setOpenNone] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const [price, setPrice] = useState(0);
  const [contractStatus, setContractStatus] = useState("");
  const [contractId, setContractId] = useState(0);

  const nonePost = async () => {
    try {
      const res = await noneRepository.post({
        none: {
          menta_id: myuid,
          client_id: sendProfile?.user_id,
        },
      });
      // console.log(res.data);
      //   Router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const contractPost = async () => {
    try {
      const res = await contractRepository.post({
        contract: {
          client_id: sendProfile?.user_id,
          menta_id: myuid,
          price: price,
          status: "unpaid",
        },
      });
      setContractStatus("unpaid");
      setContractId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const contractEndPost = async () => {
    try {
      const res = await contractRepository.update(contractId, {
        contract: {
          status: "false",
        },
      });
      setContractStatus("false");
    } catch (err) {
      console.log(err);
    }
  };

  const contractGet = async () => {
    try {
      const res = await contractRepository.get({
        params: {
          menta_id: myuid,
          client_id: sendProfile.user_id,
        },
      });
      setContractStatus(res.data.status);
    } catch (err) {
      console.log(err);
    }
  };

  const contractIntervalGet = () => {
    setInterval(async () => {
      try {
        const res = await contractRepository.get({
          params: {
            menta_id: myuid,
            client_id: sendProfile.user_id,
          },
        });
        setContractStatus(res.data.status);
      } catch (err) {
        console.log(err);
      }
    }, 10000);
  };

  useEffect(() => {
    contractGet();
    contractIntervalGet();
  }, [myuid]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "30px auto 0 0",
      }}
    >
      {contractStatus == "success" ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenContract(true);
            }}
          >
            MENTA終了
          </Button>
          <Dialog
            open={openContract}
            onClose={() => {
              setOpenContract(false);
            }}
            keepMounted
            fullWidth
          >
            <DialogTitle id="alert-dialog-title">
              {`${sendProfile.name} さんのMENTAを終了します`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                終了した時点で料金が振り込まれます。<br />
                契約を満了していない場合終了しないでください。<br />
                不正が確認されたとき料金は振り込まれません。
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
                  contractEndPost();
                }}
                autoFocus
                color="error"
              >
                終了する
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Button
            color="error"
            onClick={() => {
              setOpenNone(true);
            }}
          >
            マッチ解除
          </Button>
          <Dialog
            open={openNone}
            onClose={() => {
              setOpenNone(false);
            }}
            keepMounted
            fullWidth
          >
            <DialogTitle id="alert-dialog-title">
              {"マッチを解除します"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                このユーザーとチャットを行うことができなくなります。
                <br />
                受諾せずHomeに戻りますか？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenNone(false);
                }}
              >
                チャットに戻る
              </Button>
              <Button
                onClick={() => {
                  setOpenNone(false);
                  nonePost();
                }}
                autoFocus
                color="error"
              >
                はい
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenContract(true);
            }}
          >
            MENTA受諾
          </Button>
          <Dialog
            open={openContract}
            onClose={() => {
              setOpenContract(false);
            }}
            keepMounted
            fullWidth
          >
            <DialogTitle id="alert-dialog-title">
              {`${sendProfile.name} さんからの依頼を受諾します`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                料金を決めてください
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="price"
                placeholder="0~"
                type="number"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
              />
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
                確定
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default MentaButtons;
