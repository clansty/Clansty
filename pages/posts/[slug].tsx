import PostInfo from '../../types/PostInfo'
import {GetStaticPaths, GetStaticProps} from 'next'
import allPosts from '../../utils/allPosts'
import getPostContent from '../../utils/getPostContent'
import BlogLayout from '../../layouts/BlogLayout'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialOceanic} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Head from 'next/head'

const components = {
    code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                style={materialOceanic}
                language={match[1]}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                showLineNumbers
                {...props} />
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    },
}

export default function SinglePost({meta, content}: { meta: PostInfo, content: string }) {
    return <BlogLayout postTitle={meta.title}>
        <Head>
            <title>{meta.title} — 凌莞咕噜咕噜～</title>
        </Head>
        <div className="postContent">
            {/* @ts-ignore */}
            <ReactMarkdown components={components}>{content}</ReactMarkdown>
        </div>
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
            isInBlog: true,
        },
    }
}
