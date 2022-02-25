import { Chip } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  sendProfile: {
    user_id: string;
    name: string;
    birth: string;
    profile: string;
  };
  tag: {
    name: string;
    id: number;
  }[];
};

const ClientMessageDisplay: React.FC<Props> = ({ sendProfile, tag }) => {
  console.log(sendProfile);
  console.log(tag);

  return (
    <div>
      <img src="/images/user.jpg" width={150} height={150} alt="ロゴ" />
      <p>{sendProfile?.name}</p>
      <p>{sendProfile?.birth}</p>
      {tag?.map((str) => {
        return <Chip style={{ border: "1px solid #555" }} label={str.name} />;
      })}
      <ReactMarkdown>{sendProfile?.profile}</ReactMarkdown>
    </div>
  );
};

export default ClientMessageDisplay;
