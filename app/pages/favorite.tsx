import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import { firebase, listenAuthState } from "../components/firebase";

import { css } from "@emotion/react";
import Image from 'next/image';
import { ClassNames } from "@emotion/react";

const classes = {
  favcontent: css`
    position: relative;
    margin: 0 auto;
    padding: 0;
    font-size: 1.2rem;
    width: 70vw;
    height: 84vh;
    overflow: auto;
    min-width: 655px;
    right: 0%;
    top: 125px;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display:none;
    }
    `,
  flex: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
  `,
  card: css`
    background-color: #fff;
    border-radius: 12px;
    width: 280px;
    height: 400px;
    text-align: center;
    margin: 0 0 40px 0;
  `,
  ondata: css`
    width: 280px;
    height: 400px;
    padding: 20px;
    border-radius: 12px;
    &:hover {
      box-shadow: -2px 2px 1px 1px #ccc;
    }
  `,
  mentaIcon: css`
  width: 240px;
  border-left: 2px solid #707070;
  border-right: 2px solid #707070;
  `,
  iconImg: css`
  border-radius: 50%;
  `,
  mentaName: css`
  margin-top: 10px;
  font-size: 1.6rem;
  width: 240px;
  height: 40px;
  overflow: hidden;
  overflow-wrap: break-word;
  `,
  mentaTagarea: css`
  font-size: 1.1rem;
  margin-top: 10px;
  // background-color: red;
  width: 240px;
  height: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  overflow: hidden;
  overflow-wrap: break-word;
  line-height: 1.5rem;
  `,
  mentaTag: css`
  display: inline-block;
  padding: 0 10px;
  border-radius: 20px;
  background-color: #eaedf2;
  box-shadow: -1px 1px 1px 1px #eee;
  margin-bottom: 10px;
  `,
  mentaProfile: css`
  font-size: 1rem;
  margin-top: 10px;
  width: 240px;
  height: 120px;
  overflow: hidden;
  overflow-wrap: break-word;
  `,
}

const testmenta = [
  {
  icon: 'user',
  name: '太宰治太宰治太宰治太宰治',
  tag: ['プログラミング', 'ほげ'],
  profile: '恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。自分は停車場のブリッジを、上って、降りて、そうしてそれが線路をまたぎ越えるために造られたものだという事には全然気づかず、ただそれは停車場の構内を外国の遊戯場みたいに、複雑に楽しく、ハイカラにするためにのみ、設備せられてあるものだとばかり思っていました。しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。'
  },
  {
  icon: 'user',
  name: '太宰治太宰治太宰治太宰治',
  tag: ['プログラミング', 'ほげほげえええええええ'],
  profile: '恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。自分は停車場のブリッジを、上って、降りて、そうしてそれが線路をまたぎ越えるために造られたものだという事には全然気づかず、ただそれは停車場の構内を外国の遊戯場みたいに、複雑に楽しく、ハイカラにするためにのみ、設備せられてあるものだとばかり思っていました。しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。'
  },
  {
  icon: 'user',
  name: '太宰治太宰治太宰治太宰治',
  tag: ['プング', 'ほほほほおほおげ'],
  profile: '恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。自分は停車場のブリッジを、上って、降りて、そうしてそれが線路をまたぎ越えるために造られたものだという事には全然気づかず、ただそれは停車場の構内を外国の遊戯場みたいに、複雑に楽しく、ハイカラにするためにのみ、設備せられてあるものだとばかり思っていました。しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。'
  },
  {
  icon: 'user',
  name: '太宰治太宰治太宰治太宰治',
  tag: ['プログラミング', 'ほおおおおおおおおおおおおおげ'],
  profile: '恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。自分は停車場のブリッジを、上って、降りて、そうしてそれが線路をまたぎ越えるために造られたものだという事には全然気づかず、ただそれは停車場の構内を外国の遊戯場みたいに、複雑に楽しく、ハイカラにするためにのみ、設備せられてあるものだとばかり思っていました。しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。'
  },
];

type TestMenta = {
  icon: string,
  name: string,
  profile: string
}[]



const Favorite: NextPage = () => {
  const [myUid, setMyUid] = useState("");

  // const [testmenta, setTestmenta] = useState<TestMenta | null>(null);

  useEffect(() => {
    listenAuthState(firebase).then((uid) => {
      const myUid = uid;
      setMyUid(myUid);
    });
  }, []);

  return <Layout pageTitle="FAVORITE" userType="client">
    <div css={classes.favcontent}>
      <div css={classes.flex}>
        {testmenta != null ? testmenta.map((value) => (
          <div css={classes.card}>
            <div css={classes.ondata}>
              <div css={classes.mentaIcon}><Image src={`/images/${value.icon}.jpg`} width={130} height={130} css={classes.iconImg} /></div>
              <div css={classes.mentaName}>{value.name}</div>
              <div css={classes.mentaTagarea}>
                <div css={classes.mentaTag}>{value.tag[0]}</div>
                <div css={classes.mentaTag}>{value.tag[1]}</div>
              </div>
              <div css={classes.mentaProfile}>{value.profile}</div>
            </div>
          </div>
        )) : null}
        {
          testmenta.length % 3 == 1 ? 
          <div css={classes.card} style={{backgroundColor: "#eaedf2"}}></div> : null
        }
        {
          testmenta.length % 3 == 1 ? 
          <div css={classes.card} style={{backgroundColor: "#eaedf2"}}></div> : null
        }
        {
          testmenta.length % 3 == 2 ?
          <div css={classes.card} style={{backgroundColor: "#eaedf2"}}></div> : null
        }
      </div>
    </div>
  </Layout>;
};

export default Favorite;
