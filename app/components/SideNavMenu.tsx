import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { css } from '@emotion/react'

type Props = {
    pageTitle: string;
    pageIcon?: string;
    pageLink?: string;
}

const SideNavMenu: NextPage<Props> = ({pageTitle, pageIcon, pageLink}: any) => {
    return (
        <li css={li}>
            <Link href={pageLink}>
                <a css={a}>
                    <span css={img}>
                        <Image src={pageIcon}
                            width={27}
                            height={27}
                            css={img}
                        />
                    </span>
                    {pageTitle}
                </a>
            </Link>
        </li>
    )
}

const li = css({
    listStyle: 'none',
    marginTop: '56px'
});

const img = css({
    verticalAlign: 'middle',
    marginRight: '16px'
});

const a = css({
    fontSize: '24px'
});

export default SideNavMenu;