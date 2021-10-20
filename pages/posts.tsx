import {InferGetStaticPropsType} from 'next'
import allPosts from '../utils/allPosts'
import PostsIndexItem from '../components/PostsIndexItem'
import BlogLayout from '../layouts/BlogLayout'
import styles from '../styles/Components.module.scss'

export default function Posts({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <BlogLayout>
        <div className={styles.postList}>
            {posts.map((e, i) => <PostsIndexItem post={e} key={e.slug} index={i}/>)}
        </div>
    </BlogLayout>
}

export const getStaticProps = async () => {
    return {
        props: {
            posts: allPosts,
            isInBlog: true
        },
    }
}
