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
    margin-top: 56px;
    font-size: 24px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
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
