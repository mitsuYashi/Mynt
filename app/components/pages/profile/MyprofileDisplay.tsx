import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Autocomplete, Button, Chip, Fab, Stack } from "@mui/material";

import ReactMarkdown from "react-markdown";

import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
import Router from "next/router";

const tagRepository = RepositoryFactory.get("tags");
const userRepository = RepositoryFactory.get("users");

type Props = {
  userData: {
    name: string;
    birth: string | null;
    profile: string | null;
    url: string | null;
    user_id: string;
  };
  userType: string;
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
  wrap: css`
    width: 80%;
    margin: 0 auto;
    /* height: 100vh; */
  `,
  textfield: css`
    width: 100%;
    margin: 30px 0 0 0;
  `,
  saveButton: css`
    margin: 30px auto 0 90%;
  `,
  grid: css`
    display: grid;
    grid-template-columns: 50% 50%;
    word-break: break-all;
  `,
};

const MyProfileDisplay: React.FC<Props> = ({ userData, userType }) => {
  const [name, setName] = useState(userData.name);
  const [birth, setBirth] = useState(userData.birth);
  const [value, setValue] = useState(userData.birth);
  const [myTags, setMyTags] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<State["tags"] | null>([]);
  const [profile, setProfile] = useState(userData.profile);
  const [url, setUrl] = useState(userData.url);

  const [tags, setTags] = useState(initialState.tags);

  const getTags = async () => {
    const res = await tagRepository.get({
      params: {
        uuid: userData.user_id,
      },
    });
    setTags(res.data.tag);
    setSelectedTags(res.data.myTags);
    let newTags: number[] = [];
    res.data.myTags.map((data: { id: number }) => (
      newTags.push(data.id)
    ));
    setMyTags(newTags);
    console.log(newTags);
  };

  const handleSubmit = () => {
    const resMyTags = tagRepository.post({
      tags: {
        uuid: userData.user_id,
        myTags: myTags,
      },
    });
    console.log(resMyTags);
    const res = userRepository.update(userData.user_id, {
      user: {
        userType: userType,
        name: name,
        birth: birth,
        profile: profile,
        url: url,
      },
    });
    // console.log(res);
    // Router.push("./");
  };

  const deleteTag =
    (chipToDelete: { name: string; id: number; }) => () => {
      // const items = Object.keys(myTags);
      let newTags = [...myTags];

      setSelectedTags((chips) =>
        chips != null
          ? chips.filter((chip) => chip.id !== chipToDelete.id)
          : null
      );
      newTags = newTags.filter((chip) => chip !== chipToDelete.id);
      setMyTags(newTags);
    };

  useEffect(() => {
    if (userType == "menta" || userType == "client") {
      getTags();
    }
  }, [userType, userData]);

  return (
    <div css={classes.wrap}>
      <TextField
        id="fullWidth"
        label="new name"
        variant="outlined"
        defaultValue={userData.name}
        css={classes.textfield}
        style={{ margin: "30px 0 30px 0" }}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          // mask="____/__/__"
          disableFuture
          label="birth"
          openTo="year"
          views={["year", "month", "day"]}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setBirth(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Stack spacing={1} direction="row" style={{ margin: "30px 0 0 0" }}>
          {selectedTags?.map((tag, index) => {
            return (
              <Chip
                variant="outlined"
                label={`${tag.name}`}
                onDelete={deleteTag(tag)}
                key={index}
              />
            );
          })}
        </Stack>
        <Stack spacing={3} sx={{ width: 500 }} css={classes.textfield}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            getOptionLabel={(tags) => tags.name}
            onChange={(e, newValue) => {
              let newTags: number[] = [];
              newValue.map((val) =>
                newTags.indexOf(val.id) === -1 ? newTags.push(val.id) : null
              );
              selectedTags?.map((val) =>
                newTags.indexOf(val.id) === -1 ? newTags.push(val.id) : null
              );
              // console.log(selectedTags);
              console.log(newTags);
              setMyTags(newTags);
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Tags" />
            )}
          />
        </Stack>
      </LocalizationProvider>
      <div css={classes.grid}>
        <TextField
          id="outlined-basic"
          label="profile"
          variant="outlined"
          multiline
          defaultValue={userData.profile}
          css={classes.textfield}
          onChange={(e) => {
            setProfile(e.target.value);
          }}
          rows={10}
          // maxRows={30}
        />
        <div
          style={{
            width: "100%",
            margin: "30px 0 0 0",
            borderRadius: "6px",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <ReactMarkdown>{profile ? profile : ""}</ReactMarkdown>
        </div>
      </div>
      {userType == "menta" ? (
        <TextField
          id="outlined-basic"
          label="Youtube URL"
          variant="outlined"
          defaultValue={`https://www.youtube.com/watch?v=${userData.url}`}
          css={classes.textfield}
          placeholder="https://www.youtube.com/watch?v=..."
          onChange={(e) => {
            const url = e.target.value;
            const youtubeNum = url.indexOf("?v=", 0);
            const youtubeId = url.substr(youtubeNum + 3, 11);
            setUrl(youtubeId);
          }}
        />
      ) : null}
      {userData.url != null ? (
        <iframe
          style={{ margin: "30px 0 0 0" }}
          width="100%"
          height="544"
          src={`https://www.youtube.com/embed/${url}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : null}
      <Button
        variant="outlined"
        css={classes.saveButton}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
};

export default MyProfileDisplay;
