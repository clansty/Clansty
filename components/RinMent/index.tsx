import {useEffect, useState} from 'react'
import axios from 'axios'
import Comment from '../../types/Comment'
import SingleComment from './SingleComment'
import CommentBox from './CommentBox'

export const BASE_URL = 'https://comments.lwqwq.com/rinment/'

export default function RinMent({slug}) {
    const [comments, setComments] = useState<Comment[]>([])
    useEffect(() => {
        axios.get(BASE_URL + slug)
            .then(res => setComments(res.data.data))
    }, [])

    return <div>
        <CommentBox slug={slug} addComment={addComment}/>
        {comments.map(e => <SingleComment comment={e} key={e._id}/>)}
    </div>

    function addComment(comment: Comment) {
        setComments([...comments, comment])
    }
}
