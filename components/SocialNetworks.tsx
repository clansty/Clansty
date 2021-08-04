import {GithubOutlined, TwitterOutlined} from '@ant-design/icons'
import {TelegramIcon} from './IconSvgs'

const SocialNetworks = () => (
    <>
        <a href="https://github.com/Clansty">
            <GithubOutlined/>
        </a>
        {!process.env.BUILD_FOR_DOMESTIC && <>
            <a href="https://twitter.com/Clanstty">
                <TwitterOutlined/>
            </a>
            <a href="https://t.me/Clansty">
                <TelegramIcon/>
            </a>
        </>}
    </>
)

export default SocialNetworks
