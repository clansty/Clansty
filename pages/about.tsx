import styles from '../styles/Components.module.scss'
import Link from 'next/link'
import {LeftOutlined, TranslationOutlined} from '@ant-design/icons'
import AboutContent from '../data/AboutContent'
import {useRouter} from 'next/router'
import AboutContentEn from '../data/AboutContentEn'
import {useEffect, useState} from 'react'

export default function About() {
    const router = useRouter()
    const [lang, setLang] = useState('zh')
    useEffect(() => {
        setLang(router.query.lang as string)
    }, [router.query.lang])

    return <div className={styles.aboutContainer}>
        <div className={styles.title}>
            {lang === 'en' ? 'About' : '关于我'}
        </div>
        <div className={styles.content}>
            <div>
                {lang === 'en' ?
                    <AboutContentEn/> :
                    <AboutContent/>}
            </div>
        </div>
        <div className={styles.back}>
            <Link href="/">
                <a>
                    <LeftOutlined/>
                </a>
            </Link>
        </div>
        <div className={styles.languageSwitchMobile}>
            <Link href={{query: {lang: lang === 'en' ? 'zh' : 'en'}}}>
                <TranslationOutlined/>
            </Link>
        </div>
        <div className={styles.languageSwitch}>
            <Link href={{query: {lang: 'zh'}}}>
                中文
            </Link>
            <Link href={{query: {lang: 'en'}}}>
                English
            </Link>
        </div>
    </div>
}
