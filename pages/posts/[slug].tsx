import PostInfo from '../../types/PostInfo'
import {GetStaticPaths, GetStaticProps} from 'next'
import allPosts from '../../utils/allPosts'
import getPostContent from '../../utils/getPostContent'
import BlogLayout from '../../layouts/BlogLayout'

export default function SinglePost({meta, content}: { meta: PostInfo, content: string }) {
    return <BlogLayout postTitle={meta.title}>

    </BlogLayout>
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: allPosts.map(e => ({
            params: {
                slug: e.slug,
            },
        })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    return {
        props: {
            meta: allPosts.find(e => e.slug === params.slug),
            content: getPostContent(params.slug as string),
            isInBlog: true
        },
    }
}
