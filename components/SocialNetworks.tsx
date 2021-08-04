import {GithubOutlined, TwitterOutlined} from '@ant-design/icons'
import {TelegramIcon} from './IconSvgs'
import getConfig from 'next/config'

const SocialNetworks = () => {
    return (
        <>
            <a href="https://github.com/Clansty">
                <GithubOutlined/>
            </a>
            {!getConfig().publicRuntimeConfig?.DOMESTIC && <>
                <a href="https://twitter.com/Clanstty">
                    <TwitterOutlined/>
                </a>
                <a href="https://t.me/Clansty">
                    <TelegramIcon/>
                </a>
            </>}
        </>
    )
}

export default SocialNetworks
