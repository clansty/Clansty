import {GithubOutlined, TwitterOutlined} from '@ant-design/icons'
import {GnuPGIcon, TelegramIcon} from './IconSvgs'
import Link from 'next/link'

const SocialNetworks = () => {
    return (
        <>
            <a href="https://github.com/Clansty">
                <GithubOutlined/>
            </a>
            <a href="https://twitter.com/Clanstty">
                <TwitterOutlined/>
            </a>
            <a href="https://t.me/Clansty">
                <TelegramIcon/>
            </a>
            <Link href="/pgp">
                <a>
                    <GnuPGIcon/>
                </a>
            </Link>
        </>
    )
}

export default SocialNetworks
