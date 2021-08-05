import '../styles/globals.scss'
import styles from '../styles/Home.module.scss'
import getConfig from 'next/config'
import classNames from 'classnames'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import randomChoose from '../utils/randomChoose'
import PageSwapper from '@moxy/react-page-swapper'
import {CSSTransition} from 'react-transition-group'

function MyApp({Component, pageProps}) {
    const emojiList = ['(≧▽≦)', '( ╹▽╹ )', '(・∀・)']
    const backgrounds = [styles.background1, styles.background2]
    const [randomBackground, setRandomBackground] = useState('')
    const [chosenTitle, setChosenTitle] = useState('')
    useEffect(() => {
        setRandomBackground(randomChoose(backgrounds))
        setChosenTitle(randomChoose(emojiList))
    }, [])
    return <div className={classNames(styles.container, randomBackground)}>
        <Head>
            <title>凌莞{chosenTitle}喵～</title>
        </Head>
        <PageSwapper
            node={<Component {...pageProps} />}
            // mode="out-in"
        >
            {({style, in: inProp, onEntered, onExited, node}) => (
                <CSSTransition
                    className={styles.fade}
                    in={inProp}
                    style={style}
                    onEntered={onEntered}
                    onExited={onExited}
                    addEndListener={() => {
                    }}
                    timeout={600}
                >
                    <div>{node}</div>
                </CSSTransition>
            )}
        </PageSwapper>
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
}

export default MyApp
