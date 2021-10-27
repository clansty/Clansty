import styles from '../../styles/Components.module.scss'
import Comment from '../../types/Comment'
import formatDate from '../../utils/formatDate'

export default function SingleComment({comment}: { comment: Comment }) {
    return <div className={styles.commentEntry}>
        <img src={comment.avatar} alt={`${comment.username} 的头像`}/>
        <div className={styles.commentBody}>
            <div className={styles.username}>
                {comment.url ?
                    <a href={comment.url} target="_blank">{comment.username}</a> :
                    comment.username}
            </div>
            <div className={styles.date}>
                {formatDate('yyyy/M/d h:m', new Date(comment.date))}
            </div>
            <pre>
                {comment.content}
            </pre>
        </div>
    </div>
}
