import styles from '../styles/Components.module.scss'
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
        </div>
        {postTitle}
    </div>
}
