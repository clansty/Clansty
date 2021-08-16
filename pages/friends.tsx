import friends from '../data/friends'
import styles from '../styles/Components.module.scss'
import FriendLinkBox from '../components/FriendLinkBox'
import shuffle from '../utils/shuffle'
import Link from 'next/link'
import {LeftOutlined} from '@ant-design/icons'
import {GetServerSideProps} from 'next'
import MtfWikiLinkBox from '../components/MtfWikiLinkBox'

function Friends({friends}) {
    return <div className={styles.friendContainer}>
        <div className={styles.scrollBox}>
            <div className={styles.groupBox}>
                <div className={styles.title}>
                    好朋友们～
                </div>
                {friends.map(f => <FriendLinkBox item={f} key={f.name}/>)}
            </div>
            <div className={styles.groupBox}>
                <div className={styles.title}>
                    特别感谢！
                </div>
                <MtfWikiLinkBox/>
            </div>
        </div>
        <div className={styles.back}>
            <Link href="/">
                <a>
                    <LeftOutlined/>
                </a>
            </Link>
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            friends: shuffle(friends),
        },
    }
}

export default Friends
