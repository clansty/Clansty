import {FormEvent, useState} from 'react'
import styles from '../../styles/Components.module.scss'
import axios from 'axios'
import {BASE_URL} from './index'

export default function CommentBox({slug, addComment}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('')
    return <form className={styles.commentBox} onSubmit={sendComment}>
        来评论叭～
        <div className={styles.line1}>
            <input type="text"
                   value={username} onChange={e => setUsername(e.target.value)}
                   placeholder="称呼" required/>
            <input type="email"
                   value={email} onChange={e => setEmail(e.target.value)}
                   placeholder="邮箱（将保密）" required/>
            <input type="url"
                   value={url} onChange={e => setUrl(e.target.value)}
                   placeholder="网站（选填）"/>
        </div>
        <textarea
            value={content} onChange={e => setContent(e.target.value)}
            placeholder="正文！" required/>
        <div className={styles.sendContainer}>
            <button>发射～</button>
        </div>
    </form>

    async function sendComment(e: FormEvent) {
        e.preventDefault()
        const res = await axios.post(BASE_URL + slug, {username, email, url, content})
        console.log(res.data)
        res.data._id = new Date().getTime()
        addComment(res.data)
    }
}
