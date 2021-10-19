import {InferGetStaticPropsType} from 'next'
import allPosts from '../utils/allPosts'
import PostsIndexItem from '../components/PostsIndexItem'

export default function Posts({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <div>
        {posts.map(e => <PostsIndexItem post={e} key={e.path}/>)}
    </div>
}

export const getStaticProps = async () => {
    return {
        props: {
            posts: allPosts,
        },
    }
}
