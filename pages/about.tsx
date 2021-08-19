import styles from '../styles/Components.module.scss'
import Link from 'next/link'
import {LeftOutlined} from '@ant-design/icons'
import AboutContent from '../data/AboutContent'

export default function About(){
    return <div className={styles.aboutContainer}>
        <div className={styles.title}>
            关于我
        </div>
        <div className={styles.content}>
            <div>
                <AboutContent/>
            </div>
        </div>
        <div className={styles.back}>
            <Link href="/">
                <a>
                    <LeftOutlined/>
                </a>
            </Link>
        </div>
    </div>
}
