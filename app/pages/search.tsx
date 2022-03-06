import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import Layout from "../components/Layout";
import { firebase, listenAuthState } from "../components/firebase";
import { css } from "@emotion/react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { RepositoryFactory } from "../repositories/RepositoryFactory";

const tagRepository = RepositoryFactory.get("tags");
const searchRepository = RepositoryFactory.get("search");

type State = {
  tags: {
    name: string;
    id: number;
  }[];
  usersData:
    | {
        birth: string;
        url: string;
        name: string;
        profile: string;
        user_id: string;
      }[]
    | null;
};

const initialState: State = {
  tags: [
    {
      name: "",
      id: 0,
    },
  ],
  usersData: null,
};

const classes = {
  main: css`
    /* background-color: #ffffff; */
    position: relative;
    top: 125px;
    right: 0%;
    width: 70vw;
    height: 100%;
    min-height: 80vh;
    min-width: 655px;

    width: 68vw;
    margin: 0 auto 10px auto;
    border-radius: 12px;

    z-index: 0;
  `,
  input: css`
    width: 100%;
    padding: 30px;
    border-radius: 12px;
    background-color: #fff;
  `,
  wrap: css`
    padding: 20px 0 0 0;
    width: 90%;
    margin: 0 auto;
  `,
  cards: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
  `,
  card: css`
    padding: 10px;
    max-width: 20vw;
    /* height: 400px; */
    background-color: #fff;
    border-radius: 12px;
  `,
  itemCenter: css`
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  button: css`
    margin: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `,
};

const Search: NextPage = () => {
  const router = useRouter();
  const [myuid, setMyuid] = useState("");
  const [value, setValue] = useState();
  const [tags, setTags] = useState(initialState.tags);
  const [usersData, setUsersData] = useState(initialState.usersData);

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      setMyuid(uid);
      getTags(uid);
    });
    // console.log(router.query.id)
  }, []);

  useEffect(() => {
    router.query.id != null ? getSearch(Number(router.query.id)) : null;
  }, [router.query.id]);

  const getTags = async (uid: string) => {
    const res = await tagRepository.get({
      params: {
        uuid: uid,
      },
    });
    setTags(res.data.tag);
    if (router.query.id != null) {
      setValue(res.data.tag[Number(router.query.id) - 1]);
    }
    console.log(res.data.tag[Number(router.query.id) - 1]);
  };

  const getSearch = async (tagId: number | undefined) => {
    try {
      if (tagId != null) {
        const res = await searchRepository.get({
          params: {
            tag_id: tagId,
          },
        });
        console.log(res.data.users);
        setUsersData(res.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout pageTitle="SEARCH" userType="client">
      <div css={classes.main}>
        <div css={classes.input}>
          <Autocomplete
            id="tags-standard"
            options={tags}
            getOptionLabel={(tags) => tags.name}
            onChange={(e, newValue) => {
              getSearch(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="SEARCH" />
            )}
          />
        </div>
        <div css={classes.wrap}>
          <div css={classes.cards}>
            {usersData?.map((val, index) => (
              <div css={classes.card} key={index}>
                <div css={classes.itemCenter}>
                  <img src="/images/user.svg" width={50} height={50} />
                  <p style={{ fontSize: "1.2rem" }}>{val.name}</p>
                </div>
                {val.profile != null ? (
                  <p>{val.profile.substring(0, 50) + "..."}</p>
                ) : null}
                <div css={classes.button}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      Router.push(`/profile/${val.user_id}`);
                    }}
                  >
                    詳細
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
