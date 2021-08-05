import FriendLink from '../types/FriendLink'
import styles from '../styles/FriendLinkBox.module.scss'
import Image from 'next/image'

export default function FriendLinkBox({item}: { item: FriendLink }) {
    return <a href={item.url} target="_blank">
        <div className={styles.box}>
            <div className={styles.avatar}>
                <Image
                    src={'/friend-avatars/' + item.avatar}
                    height={80}
                    width={80}
                    objectFit="cover"
                    alt=""
                />
            </div>
            <div className={styles.text}>
                <div className={styles.name}>
                    {item.name}
                </div>
                <div className={styles.desc}>
                    {item.desc}
                </div>
            </div>
            <style jsx>{`
              div {
                --color: ${item.color}
              }
            `}</style>
        </div>
    </a>
}
