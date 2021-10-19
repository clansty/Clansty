import PostInfo from '../types/PostInfo'
import Link from 'next/link'
import styles from '../styles/Components.module.scss'
import formatDate from '../utils/formatDate'

export default function PostsIndexItem({post}: { post: PostInfo }) {
    return <Link href={`/posts/${post.path}`}>
        <a>
            <div className={styles.postItem}>
                <div className={styles.title}>
                    {post.title}
                </div>
                <div className={styles.date}>
                    {formatDate('yyyy/MM/dd', new Date(post.date))}
                </div>
                <div className={styles.desc}>
                    {post.desc}
                </div>
                <div className={styles.hf}/>
            </div>
        </a>
    </Link>
}
