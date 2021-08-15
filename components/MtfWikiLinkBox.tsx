import styles from '../styles/Components.module.scss'
import classNames from 'classnames'

export default function MtfWikiLinkBox() {
    return <a href="https://mtf.wiki" target="_blank">
        <div className={classNames(styles.friendLinkBox, styles.mtfWikiLinkBox)}>
            <div className={styles.avatar}>
                <img
                    src="https://cdn.lwqwq.com/pic/mtf-wiki-square.svg"
                    height={80}
                    width={80}
                    alt="MtF Wiki"
                />
            </div>
            <div className={styles.text}>
                <div className={styles.name}>
                    MtF Wiki
                </div>
                <div className={styles.desc}>
                    <span className={styles.less}>
                    不向焦虑与抑郁投降，这个世界终会有我们存在的地方。
                    </span>
                    <span className={styles.more}>
                    如果你能记住我的名字，如果你们都能记住我的名字，也许我或者“我们”，终有一天能自由地生存着。
                    </span>
                </div>
            </div>
        </div>
    </a>
}
