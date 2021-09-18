import Twemoji from '../components/Twemoji'
import {ArchLinuxIcon, NextIcon, NodeIcon, OpenSUSEIcon, PythonIcon, VercelIcon, VueIcon} from '../components/IconSvgs'

export default function AboutContentEn() {
    return <>
        <p>
            Hello&nbsp;
            <Twemoji text="👋" unicode="1f44b"/>
            <b>Clansty</b> here!
        </p>
        <p>
            Software Engineering Sophomore.&nbsp;
            <Twemoji text="👩‍💻" unicode="1f469-200d-1f4bb"/>
        </p>
        <p>
            Pride as a&nbsp;
            <Twemoji text="🏳️‍⚧️" unicode="1f3f3-fe0f-200d-26a7-fe0f"/>
            MtF,&nbsp;
            <Twemoji text="🏳️‍🌈" unicode="1f3f3-fe0f-200d-1f308"/>
            a member of LGBTQ+
        </p>
        <p>
            Like all kinds of <del>weird</del> kawaii things
        </p>
        <p>
            Like cats!&nbsp;
            <Twemoji text="🐱" unicode="1f431"/>
        </p>
        <p>Tossing weird techniques</p>
        <p>
            Usually use JavaScript,&nbsp;
            <NodeIcon/>
            Node.JS for backend and utilities
        </p>
        <p>
            Seldom use&nbsp;
            <PythonIcon/>
            Python
        </p>
        <p>
            Used to use&nbsp;
            <VueIcon/>
            Vue 2 for frontend, but now&nbsp;
            <Twemoji text="⚛️" unicode="269b"/>
            React。
        </p>
        <p>React is so good that I always use react to create web apps now</p>
        <p>This site is written in React (
            <NextIcon/>
            Next.JS) and hosted on&nbsp;
            <VercelIcon/>
        </p>
        <p>Learnt some Python, C# and Java</p>
        <p>Once learnt C++, but forgot now</p>
        <p>
            Now using&nbsp;
            <OpenSUSEIcon/>
            openSUSE and&nbsp;
            <ArchLinuxIcon/>
            Arch Linux
        </p>
    </>
}
