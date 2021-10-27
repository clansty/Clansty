import {FormEvent, useEffect, useState} from 'react'
import styles from '../../styles/Components.module.scss'
import axios from 'axios'
import {BASE_URL} from './index'

export default function CommentBox({slug, addComment}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('')
    const [isDisabled, setDisabled] = useState(false)

    useEffect(() => {
        const userInfoToken = localStorage.getItem('commentUserInfo')
        if (!userInfoToken) return
        const userInfo = JSON.parse(userInfoToken) as [string, string, string]
        if (userInfo.length !== 3) return
        setUsername(userInfo[0])
        setEmail(userInfo[1])
        setUrl(userInfo[2])
    }, [])

    return <form className={styles.commentBox} onSubmit={sendComment}>
        来评论叭～
        <fieldset disabled={isDisabled}>
            <div>
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
            <div>
                <button>发射～</button>
            </div>
        </fieldset>
    </form>

    async function sendComment(e: FormEvent) {
        e.preventDefault()
        setDisabled(true)
        localStorage.setItem('commentUserInfo', JSON.stringify([username, email, url]))
        const res = await axios.post(BASE_URL + slug, {username, email, url, content})
        setContent('')
        res.data._id = new Date().getTime()
        addComment(res.data)
        setDisabled(false)
    }
}
