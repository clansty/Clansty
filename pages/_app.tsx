import '../styles/globals.scss'
import styles from '../styles/Home.module.scss'
import classNames from 'classnames'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import randomChoose from '../utils/randomChoose'
import PageSwapper from '@moxy/react-page-swapper'
import {CSSTransition} from 'react-transition-group'
import Image from 'next/image'

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
            <link rel="icon" type="image/webp" href="/favicon.webp"/>
            <title>凌莞{chosenTitle}喵～</title>
        </Head>
        <PageSwapper
            node={<Component {...pageProps} />}
        >
            {({in: inProp, onEntered, onExited, node}) => (
                <CSSTransition
                    className={styles.fade}
                    in={inProp}
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
    </div>
}

export default MyApp
