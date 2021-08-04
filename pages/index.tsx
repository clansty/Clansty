import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import classNames from 'classnames'
import LinkEntries from '../components/LinkEntries'
import randomChoose from '../utils/randomChoose'

export default function Home() {
    const emojiList = ['(≧▽≦)', '( ╹▽╹ )', '(・∀・)']
    return (
        <div className={classNames(styles.container, styles.background1)}>
            <Head>
                <title>凌莞{randomChoose(emojiList)}喵～</title>
            </Head>

            {LinkEntries()}

            <footer className={styles.footer}>
                <a href="https://beian.miit.gov.cn/" target="_blank" className={styles.beian}>
                    <small>
                        苏ICP备2020048816号-1
                    </small>
                </a>
            </footer>
        </div>
    )
}
