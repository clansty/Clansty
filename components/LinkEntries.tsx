import styles from '../styles/LinkEntries.module.scss'
import SocialNetworks from './SocialNetworks'

export default ()=>(
    <div className={styles.container}>
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
        <a href="https://nyac.at/friends">
            好朋友们
            <span>Links</span>
        </a>
        <div className={styles.footer}>
            {SocialNetworks()}
        </div>
    </div>
)
