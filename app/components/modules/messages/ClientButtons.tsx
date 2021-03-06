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
            ????????????
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
              {`${sendProfile.name} ????????????????????????????????????`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ????????????????????????????????????MENTA????????????????????????
                <br />
                ??????MENTA???????????????????????????????????????
                <br />
                ????????????????????????????
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenEndContract(false);
                }}
              >
                ?????????????????????
              </Button>
              <Button
                onClick={() => {
                  contractEndPost();
                  setOpenEndContract(false);
                }}
                autoFocus
                color="error"
              >
                ????????????
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
            ???????????????
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
              {"???????????????????????????"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ??????????????????????????????????????????????????????????????????????????????
                <br />
                ???????????????????????????????????????????????????????????????????????????
                <br />
                ??????????????????Home?????????????????????
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenNone(false);
                }}
              >
                ?????????????????????
              </Button>
              <Button
                onClick={() => {
                  setOpenNone(false);
                  nonePost();
                }}
                autoFocus
                color="error"
              >
                ??????
              </Button>
            </DialogActions>
          </Dialog>
          <Tooltip
            title="MENTA????????????????????????????????????????????????????????????"
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
                MENTA??????
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
                {`${sendProfile.name} ???????????????????????????`}
                <Chip
                  style={{ position: "relative", right: "-250px" }}
                  label={`??${price}`}
                  color="primary"
                  variant="outlined"
                />
              </DialogTitle>
            </Stack>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ??????????????????????????????
                <br />
                ????????????????????????????????????????????????MENTA????????????????????????
                <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenContract(false);
                }}
              >
                ?????????????????????
              </Button>
              <Button
                onClick={() => {
                  setOpenContract(false);
                  contractPost();
                }}
                autoFocus
                color="error"
              >
                ???????????????
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ClientButtons;
