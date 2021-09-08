import Twemoji from '../components/Twemoji'
import {ArchLinuxIcon, NextIcon, NodeIcon, OpenSUSEIcon, PythonIcon, VercelIcon, VueIcon} from '../components/IconSvgs'

export default function AboutContent() {
    return <>
        <p>
            嗨
            <Twemoji text="👋" unicode="1f44b"/>
            这里是
            <b>凌莞 / Clansty</b>
        </p>
        <p>
            目前上大二，专业是
            <del>软妹工程</del>
            软件工程
            <Twemoji text="👩‍💻" unicode="1f469-200d-1f4bb"/>
        </p>
        <p>
            是一只
            <Twemoji text="🏳️‍⚧️" unicode="1f3f3-fe0f-200d-26a7-fe0f"/>
            MtF，
            <Twemoji text="🏳️‍🌈" unicode="1f3f3-fe0f-200d-1f308"/>
            LGBTQ+ 群体中的一员
        </p>
        <p>
            喜欢各种
            <del>奇奇怪怪</del>
            可可爱爱的东西
        </p>
        <p>
            喜欢猫咪！
            <Twemoji text="🐱" unicode="1f431"/>
        </p>
        <p>平时喜欢干的事情是折腾各种奇奇怪怪的技术</p>
        <p>
            比较喜欢用 JavaScript 写东西，后端和小工具一般用
            <NodeIcon/>
            Node.JS
        </p>
        <p>
            偶尔写写
            <PythonIcon/>
            Python
        </p>
        <p>
            前端之前比较喜欢用
            <VueIcon/>
            Vue 2，现在在学
            <Twemoji text="⚛️" unicode="269b"/>
            React。
        </p>
        <p>React 大好。所以现在更喜欢用 React 写东西。</p>
        <p>像这个主站就是用 React (
            <NextIcon/>
            Next.JS) 写的，托管在
            <VercelIcon/>
            上
        </p>
        <p>大概是会一点 Python，也会一点 C# 和 Java</p>
        <p>学过 C++，但是现在大概不会了</p>
        <p>
            目前使用的操作系统是
            <OpenSUSEIcon/>
            openSUSE 和
            <ArchLinuxIcon/>
            Arch Linux
        </p>
    </>
}
