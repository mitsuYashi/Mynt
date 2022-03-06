import type { NextPage } from "next";
import { css } from "@emotion/react";
import Image from "next/image";
import React, { MouseEventHandler, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
import { firebase, listenAuthState } from "./firebase";
const tagRepository = RepositoryFactory.get("tags");

type Props = {
  currentpage: string;
};

type State = {
  tags: {
    name: string;
    id: number;
  }[];
};
const initialState: State = {
  tags: [
    {
      name: "",
      id: 0,
    },
  ],
};

const classes = {
  topNavFixed: css`
    width: 70vw;
    min-width: 655px;
    position: fixed;
    top: 20px;
    right: 0%;
    margin: 0;
    z-index: 1;
  `,
  topNav: css`
    width: 70vw;
    min-width: 655px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px 0 0 12px;
    /* box-shadow: -2px 2px 1px 1px #ccc; */
    border: 1px solid #eaedf2;
    /* border-right: #fff; */
    margin: 0;
    background-color: #fff;
  `,
  h2: css`
    margin-left: 80px;
    font-size: 32px;
  `,
  search: css`
    width: 30%;
    min-width: 230px;
    height: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 8%;
  `,
  input: css`
    width: 80%;
    min-width: 184px;
    height: 100%;
    border: none;
    border-radius: 32px;
    padding-left: 32px;
    background-color: #eaedf2;
  `,
  inputButton: css`
    height: 100%;
    border: none;
    background-color: #fff;
  `,
};

const TopNav: NextPage<Props> = ({ currentpage }) => {
  const router = useRouter();
  const [tags, setTags] = useState(initialState.tags);
  const [searchId, setSearchId] = useState<number>();
  const [searchName, setSearchName] = useState<string>();

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      getTags(uid);
    });
  }, []);

  const searchButton: MouseEventHandler = () => {
    router.push(`/search?id=${searchId}`);
  };

  const getTags = async (uid: string) => {
    const res = await tagRepository.get({
      params: {
        uuid: uid,
      },
    });
    setTags(res.data.tag);
  };

  return (
    <div css={classes.topNavFixed}>
      <div css={classes.topNav}>
        <h2 css={classes.h2}>{currentpage}</h2>
        <div css={classes.search}>
          {router.pathname == "/search" ? null : (
            <>
              <Autocomplete
                disablePortal
                autoHighlight
                id="tags-standard"
                options={tags}
                getOptionLabel={(tags) => tags.name}
                onChange={(e, newValue) => {
                  setSearchId(newValue?.id);
                  setSearchName(newValue?.name);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="SEARCH"
                    style={{ borderRadius: "12px" }}
                    size="small"
                  />
                )}
                sx={{ width: "80%" }}
              />
              <button
                css={classes.inputButton}
                onClick={searchButton}
                style={{ cursor: "pointer" }}
              >
                <Image src={"/images/searchIcon.png"} width={25} height={25} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
