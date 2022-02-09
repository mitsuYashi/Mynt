import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Fab } from "@mui/material";

type Props = {
  userData: {
    name: string;
    birth: string;
    profile: string;
    url: string;
    user_id: string;
  };
  userType: string;
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
};

const MyProfileDisplay: React.FC<Props> = ({ userData, userType }) => {
  const username = useRef();
  const [birth, setBirth] = useState(userData.birth);
  const [value, setValue] = useState(null);

  return (
    <div css={classes.wrap}>
      <TextField
        id="fullWidth"
        label="new name"
        variant="outlined"
        defaultValue={userData.name}
        css={classes.textfield}
        style={{ margin: "30px 0 30px 0" }}
      />
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          disableFuture
          label="birth"
          openTo="year"
          views={["year", "month", "day"]}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        id="outlined-basic"
        label="profile"
        variant="outlined"
        multiline
        defaultValue={userData.profile}
        css={classes.textfield}
        rows={5}
      />
      {
        userType == "menta" ? 
        <TextField
          id="outlined-basic"
          label="Youtube URL"
          variant="outlined"
          defaultValue={userData.url}
          css={classes.textfield}
        /> : null
      }
      <Fab color="primary" aria-label="edit">
        Edit
      </Fab>
    </div>
  );
};

export default MyProfileDisplay;
