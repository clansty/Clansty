import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import classNames from 'classnames'
import LinkEntries from '../components/LinkEntries'
import randomChoose from '../utils/randomChoose'
import {useEffect, useState} from 'react'
import getConfig from 'next/config'

export default function Home() {
    const emojiList = ['(≧▽≦)', '( ╹▽╹ )', '(・∀・)']
    const backgrounds = [styles.background1, styles.background2]
    const [randomBackground, setRandomBackground] = useState('')
    const [chosenTitle, setChosenTitle] = useState('')
    useEffect(() => {
        setRandomBackground(randomChoose(backgrounds))
        setChosenTitle(randomChoose(emojiList))
    }, [])

    return (
        <div className={classNames(styles.container, randomBackground)}>
            <Head>
                <title>凌莞{chosenTitle}喵～</title>
            </Head>

            {LinkEntries()}

            <footer className={styles.footer}>
                {getConfig().publicRuntimeConfig?.DOMESTIC ?
                    <a href="https://beian.miit.gov.cn/" target="_blank" className={styles.beian}>
                        苏ICP备2020048816号-1
                    </a>
                    :
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Hosted on {' '}
                        <span className={styles.logo}>
                        <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
                    </span>
                    </a>
                }
            </footer>
        </div>
    )
}
