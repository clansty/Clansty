import PostInfo from '../types/PostInfo'
import Link from 'next/link'
import styles from '../styles/Components.module.scss'
import formatDate from '../utils/formatDate'

export default function PostsIndexItem({post, index}: { post: PostInfo, index: number }) {
    return <Link href={`/posts/${post.slug}`}>
        <a>
            <div className={`${styles.postItem} postItem`} style={{transitionDelay: `${index * 0.1}s`}}>
                <div className={styles.title}>
                    {post.title}
                </div>
                {post.banner && <img src={post.banner} alt={post.title} className={styles.banner}/>}
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
