import type { NextPage } from "next";
import { css } from "@emotion/react";
import React from "react";
import { useEffect, useState } from "react";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import { firebase, listenAuthState } from "./firebase";
import { Autocomplete, InputBase, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { borderRadius } from "@mui/system";
const tagRepository = RepositoryFactory.get("tags");

type Props = {
  search: string;
};

const classes = {
  search: css`
    height: 50%;
    width: 250px;
    transition: .3s;
    display: flex;
    position: relative;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
    margin-right: 8%;
    background-color: #eaedf2;
  `,
};


const SearchBar: NextPage<Props> = (props) => {
  const [search, setSearch]: any = useState(props);

  const test = (props: any) => {
    setSearch(props);
    console.log(search);
  }

  const tagGet = async (uuid: string) => {
    try {
      const res = await tagRepository.get({
        params: {
          uuid: uuid,
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      tagGet(uid);
    });
  }, []);

  
  const options = ['Option 1', 'Option 2'];
  
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div css={classes.search}>
      <Search sx={{
        marginLeft: '20px'
      }}/>
      <Autocomplete
        sx={{
          display: 'inline-block',
          marginTop:'2rem',
          width: '200px',
  
          '& input': {
            position: 'absolute',
            top: '22%',
            fontSize: '1rem',
            border: 'none',
            width: 200,
            transition: '.3s',
            borderRadius: '10px',
            bgcolor: '#eaedf2',
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },

          '& input:focus': {
            outline: 'none',
            border: 'none'
          }
        }}
        onChange={(e: any, newValue: string | null) => {
          setValue(newValue);
          console.log(value);
        }}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text" {...params.inputProps} placeholder="Search" />
          </div>
        )}
        />
    </div>
      // <Autocomplete
      //   css={classes.search}
      //   onChange={(e: any, newValue: string | null) => {
      //     setValue(newValue);
      //     console.log(value);
      //   }}
      //   inputValue={inputValue}
      //   onInputChange={(e, newInputValue) => {
      //     setInputValue(newInputValue);
      //   }}
      //   id="controllable-states"
      //   options={options}
      //   sx={{ width: 300 }}
      //   renderInput={(params) => <TextField  css={classes.searchText} {...params} label="Search" />}
      // />
  );
};
export default SearchBar;
