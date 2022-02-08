import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { css } from "@emotion/react";
import { cursorTo } from "readline";

type Props = {
  pageTitle: string;
  pageIcon?: string;
  pageLink?: string;
};

const classes = {
  li: css`
    list-style: none;
    margin-top: 36px;
    padding: 7px 30px 5px 20px;
    font-size: 24px;
    cursor: pointer;
    border-radius: 40px;
    outline: .5px solid;
    outline-color: transparent;
    outline-offset: 12px;
    transition: .8s;
    &:hover {
      outline-color: #ddd;
      outline-offset: 0px;
    }
  `,
  img: css`
    vertical-align: middle;
    margin-right: 16px;
  `,
};

const SideNavMenu: NextPage<Props> = ({
  pageTitle,
  pageIcon,
  pageLink,
}: any) => {
  return (
    <Link href={pageLink}>
      <li css={classes.li}>
        <span css={classes.img}>
          <Image src={pageIcon} width={27} height={27} css={classes.img} />
        </span>
        {pageTitle}
      </li>
    </Link>
  );
};

export default SideNavMenu;
