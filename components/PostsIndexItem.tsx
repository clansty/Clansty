import PostInfo from '../types/PostInfo'
import Link from 'next/link'

export default function PostsIndexItem({post}:{post:PostInfo}){
    return <div>
        <Link href={`/posts/${post.path}`}>
            <div>
                {post.title}
            </div>
        </Link>
    </div>
}
