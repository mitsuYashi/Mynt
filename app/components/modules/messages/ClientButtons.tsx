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

const ClientButtons: React.FC<Props> = ({ myuid, sendProfile }) => {
  const [openNone, setOpenNone] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const [openEndContract, setOpenEndContract] = useState(false);
  const [contractStatus, setContractStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [contractId, setContractId] = useState(0);

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
  };

  const contractGet = async () => {
    try {
      const res = await contractRepository.get({
        params: {
          client_id: myuid,
        },
      });
      setContractId(res.data.id);
      setContractStatus(res.data.status);
      setPrice(res.data.price);
    } catch (err) {
      console.log(err);
    }
  };

  const contractIntervalGet = () => {
    setInterval(async () => {
      try {
        const res = await contractRepository.get({
          params: {
            client_id: myuid,
          },
        });
        setContractId(res.data.id);
        setContractStatus(res.data.status);
        setPrice(res.data.price);
      } catch (err) {
        console.log(err);
      }
    }, 10000);
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
              setOpenEndContract(true);
            }}
          >
            契約終了
          </Button>
          <Dialog
            open={openEndContract}
            onClose={() => {
              setOpenEndContract(false);
            }}
            keepMounted
            fullWidth
          >
            <DialogTitle id="alert-dialog-title">
              {`${sendProfile.name} さんとの契約を終了します`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                契約を終了すると、報酬がMENTAに送信されます。
                <br />
                再びMENTAを依頼することもできます。
                <br />
                契約を終了しますか?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenEndContract(false);
                }}
              >
                チャットに戻る
              </Button>
              <Button
                onClick={() => {
                  contractEndPost();
                  setOpenEndContract(false);
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
                このユーザーが一カ月の間おすすめに表示されません。
                <br />
                依頼を行わずHomeに戻りますか？
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
          <Tooltip
            title="MENTAが料金を確定した場合押せるようになります"
            placement="top"
          >
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
                <Chip
                  style={{ position: "relative", right: "-250px" }}
                  label={`¥${price}`}
                  color="primary"
                  variant="outlined"
                />
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
        </>
      )}
    </div>
  );
};

export default ClientButtons;
