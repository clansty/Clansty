import friends from '../data/friends'
import styles from '../styles/Friends.module.scss'
import FriendLinkBox from '../components/FriendLinkBox'

function Friends() {
    return <div className={styles.container}>
        <div className={styles.title}>
            好朋友们～
        </div>
        {friends.map(f => <FriendLinkBox item={f} key={f.name}/>)}
    </div>
}

export default Friends
