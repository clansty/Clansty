import {GithubOutlined, TwitterOutlined} from '@ant-design/icons'
import {TelegramIcon} from './IconSvgs'

export default () => (
    <>
        <a href="https://github.com/Clansty">
            <GithubOutlined/>
        </a>
        {typeof window !== 'undefined' && !/lwqwq\.com/.test(location.hostname) && <>
            <a href="https://twitter.com/Clanstty">
                <TwitterOutlined/>
            </a>
            <a href="https://t.me/Clansty">
                <TelegramIcon/>
            </a>
        </>}
    </>
)
