import styles from '../styles/Components.module.scss'
import SocialNetworks from '../components/SocialNetworks'
import Link from 'next/link'
import {useRef} from 'react'

export default function Home() {
    const highlightRef = useRef<HTMLDivElement>()

    return <div className={styles.linkContainer} onMouseLeave={leave}>
        <div className={styles.title} onMouseEnter={leave}>
            你好，这里是凌莞
        </div>
        <div className={styles.highlight} aria-hidden={true} ref={highlightRef}/>
        <a href="https://nyac.at" onMouseEnter={hoverHandler} onFocus={hoverHandler}>
            博客
            <span>Blog</span>
        </a>
        <a href="https://dl.lwqwq.com" onMouseEnter={hoverHandler} onFocus={hoverHandler}>
            资源
            <span>Downloads</span>
        </a>
        <Link href="/friends">
            <a onMouseEnter={hoverHandler} onFocus={hoverHandler}>
                好朋友们
                <span>Links</span>
            </a>
        </Link>
        <Link href="/about">
            <a onMouseEnter={hoverHandler} onFocus={hoverHandler}>
                关于我
                <span>About</span>
            </a>
        </Link>
        <div className={styles.footer} onMouseEnter={leave}>
            <div className={styles.space} onMouseEnter={leave}/>
            {SocialNetworks(hoverHandler)}
            <div className={styles.space} onMouseEnter={leave}/>
        </div>
    </div>

    let timeOutId

    function hoverHandler(e) {
        timeOutId && clearTimeout(timeOutId)
        highlightRef.current.style.transform =
            `translateX(${e.currentTarget.offsetLeft}px) translateY(${e.currentTarget.offsetTop}px)`
        highlightRef.current.style.height = `${e.currentTarget.clientHeight}px`
        highlightRef.current.style.width = `${e.currentTarget.clientWidth}px`
        highlightRef.current.style.display = 'block'
        timeOutId = setTimeout(() => highlightRef.current.style.opacity = '1', 0)
    }

    function leave() {
        timeOutId && clearTimeout(timeOutId)
        highlightRef.current.style.opacity = '0'
        timeOutId = setTimeout(() => highlightRef.current.style.display = 'none', 500)
    }
}
