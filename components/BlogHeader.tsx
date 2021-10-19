import styles from '../styles/Components.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import {LeftOutlined} from '@ant-design/icons'

export default function BlogHeader({postTitle}: { postTitle?: string }) {
    return <div className={`${styles.header} blogHeader`}>
        <div className={styles.back}>
            <Link href={postTitle ? '/posts' : '/'}>
                <a>
                    <LeftOutlined/>
                </a>
            </Link>
            {postTitle}
        </div>
    </div>
}
