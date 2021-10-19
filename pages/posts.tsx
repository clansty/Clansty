import {InferGetStaticPropsType} from 'next'
import allPosts from '../utils/allPosts'
import PostsIndexItem from '../components/PostsIndexItem'
import BlogLayout from '../layouts/BlogLayout'

export default function Posts({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <BlogLayout>
        {posts.map(e => <PostsIndexItem post={e} key={e.path}/>)}
    </BlogLayout>
}

export const getStaticProps = async () => {
    return {
        props: {
            posts: allPosts,
        },
    }
}
