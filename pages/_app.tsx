import '../styles/globals.scss'
import styles from '../styles/Home.module.scss'
import classNames from 'classnames'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import randomChoose from '../utils/randomChoose'
import PageSwapper from '@moxy/react-page-swapper'
import {CSSTransition} from 'react-transition-group'

function MyApp({Component, pageProps}) {
    const emojiList = ['(≧▽≦)', '( ╹▽╹ )', '(・∀・)']
    const backgrounds = [styles.background1, styles.background2, styles.background3]
    const [randomBackground, setRandomBackground] = useState('')
    const [chosenTitle, setChosenTitle] = useState('')
    useEffect(() => {
        setRandomBackground(randomChoose(backgrounds))
        setChosenTitle(randomChoose(emojiList))
    }, [])
    return <div className={classNames(styles.container, randomBackground)}>
        <Head>
            <link rel="icon" type="image/webp" href="/favicon.webp"/>
            <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
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
