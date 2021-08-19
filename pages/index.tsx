import styles from '../styles/Components.module.scss'
import SocialNetworks from '../components/SocialNetworks'
import Link from 'next/link'

export default function Home() {
    return <div className={styles.linkContainer}>
        <div className={styles.title}>
            你好，这里是凌莞
        </div>
        <a href="https://nyac.at">
            博客
            <span>Blog</span>
        </a>
        <a href="https://csty.ltd">
            资源
            <span>Downloads</span>
        </a>
        <Link href="/friends">
            <a>
                好朋友们
                <span>Links</span>
            </a>
        </Link>
        <Link href="/about">
            <a>
                关于我
                <span>About</span>
            </a>
        </Link>
        <div className={styles.footer}>
            {SocialNetworks()}
        </div>
    </div>
}
