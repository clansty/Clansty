import styles from '../styles/Components.module.scss'
import BlogHeader from '../components/BlogHeader'

export default function BlogLayout({postTitle, children}: { postTitle?: string, children: any }) {
    return <div className={styles.blogLayout}>
        <BlogHeader postTitle={postTitle}/>
        <div className={`${styles.body} blogBody`}>
            {children}
        </div>
    </div>
}
