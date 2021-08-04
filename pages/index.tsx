import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import classNames from 'classnames'
import LinkEntries from '../components/LinkEntries'

export default function Home() {
    return (
        <div className={classNames(styles.container,styles.background1)}>
            <Head>
                <title>Create Next App</title>
            </Head>

            <LinkEntries/>

            <footer className={styles.footer}>
                <a href="https://beian.miit.gov.cn/" target="_blank">
                    <small>
                        苏ICP备2020048816号-1
                    </small>
                </a>
                <br/>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
                    </span>
                </a>
            </footer>
        </div>
    )
}
