// import { TextField } from "@mui/material";
// import router from "next/router";
// import React, { FormEventHandler, useEffect, useState } from "react";
// import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
// import { addMessage, firebase, listenAuthState } from "../../firebase";

// const userRepository = RepositoryFactory.get("users");
// const messageRepository = RepositoryFactory.get("messages");

// type messages = {
//   created_at: {
//     seconds: number;
//     nanoseconds: number;
//   };
//   message: string;
//   sendUid: string;
//   uid: string;
//   user: string;
// };

// type Props = {
//   uids: {
//     myUid: string;
//     toUid: string;
//   };
// };

// const Chat: React.FC<Props> = ({ uids }) => {
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [messages, setMessages] = useState<messages[]>([]);

//   const messageUserGet = async () => {
//     const res = await messageRepository.get({
//       params: {
//         uid_first: uids.myUid,
//         uid_second: uids.toUid,
//       },
//     });
//     console.log(res.data);
//     // res.data === "" ? router.push("../home") : null;
//     setMyprofile(res.data.myProfile);
//     setSendProfile(res.data.sendProfile);
//   };

//   const handleSubmit: FormEventHandler = (e) => {
//     e.preventDefault();
//     if (newMessage != null && newMessage != "") {
//       addMessage(uids.myUid, uids.toUid, newMessage);
//       setNewMessage("");
//     }
//   };

//   useEffect(() => {
//     // uidが取得済みの時、user情報をとってくる
//     const res =
//       uids.myUid !== "" && uids.toUid !== "" ? messageUserGet() : null;
//     // リアルタイムアップデート
//     if (res != null) {
//       console.log(uids.myUid);
//       const userIds = [uids.myUid, uids.toUid].sort();
//       const id = userIds[0] + userIds[1];
//       const unsubscribe = onSnapshot(collection(db, id), (querySnapshot) => {
//         const res: messages[] = querySnapshot.docs.map((doc) => {
//           return doc.data() as messages;
//         });
//         const result: messages[] = res.sort((a: messages, b: messages) => {
//           return a.created_at.seconds < b.created_at.seconds ? -1 : 1;
//         });
//         setMessages(result);
//         console.log(result);
//       });
//       return unsubscribe;
//     }
//   }, [uids.myUid, uids.toUid]);

//   return (
//     <div css={classes.messageBack}>
//       <div>
//         <div css={classes.messageFlex}>
//           {messages.map((str, index) => {
//             console.log(str.user);
//             return (
//               <div css={classes.myMessage} key={index}>
//                 {str.message}
//               </div>
//             );
//           })}
//           {/* <div css={classes.sendMessage}>aaaaaa</div> */}
//         </div>
//       </div>
//       <form onSubmit={handleSubmit} style={{ borderTop: "1px solid #eee" }}>
//         {/* <input type="text" ref={messageRef} /> */}
//         <TextField
//           id="standard-multiline-static"
//           // label="Multiline"
//           placeholder="メッセージを入力"
//           rows={4}
//           variant="standard"
//           fullWidth
//           onChange={(e) => {
//             setNewMessage(e.target.value);
//           }}
//           onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
//             if (e.key === "Enter") {
//               // エンターキー押下時の処理
//               (e.currentTarget as unknown as HTMLTextAreaElement).value = "";
//             }
//           }}
//           style={{ margin: "30px 0 0 0" }}
//         />
//         {/* <input type="submit" value="送信" /> */}
//       </form>
//     </div>
//   );
// };

// export default Chat;
