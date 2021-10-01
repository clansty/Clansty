import {GithubOutlined, MailOutlined, TwitterOutlined} from '@ant-design/icons'
import {GnuPGIcon, TelegramIcon} from './IconSvgs'
import Link from 'next/link'

const SocialNetworks = (hoverHandler) => {
    return (
        <>
            <a onClick={sendMail} tabIndex={0} onMouseEnter={hoverHandler} onFocus={hoverHandler}>
                <MailOutlined/>
            </a>
            <a href="https://github.com/Clansty" onMouseEnter={hoverHandler} onFocus={hoverHandler}>
                <GithubOutlined/>
            </a>
            <a href="https://twitter.com/Clanstty" onMouseEnter={hoverHandler} onFocus={hoverHandler}>
                <TwitterOutlined/>
            </a>
            <a href="https://t.me/Clansty" onMouseEnter={hoverHandler} onFocus={hoverHandler}>
                <TelegramIcon/>
            </a>
            <Link href="/pgp">
                <a onMouseEnter={hoverHandler} onFocus={hoverHandler}>
                    <GnuPGIcon/>
                </a>
            </Link>
        </>
    )
}

export default SocialNetworks

function sendMail() {
    const emptyObj = {}
    // @ts-ignore
    const part1 = `${emptyObj.nonExist}`[5]
    const part2 = String.fromCharCode(Math.pow(2, 6))
    const part3 = atob('Z2FvNC5wdw==')
    const proto = atob('bWFpbHRvOg==')
    const adr = `${proto}${part1}${part2}${part3}`
    const link = document.createElement('a')
    link.href = adr
    link.click()
}
