import styles from '../styles/Components.module.scss'
import Error from 'next/error'

export default function FiveOO() {
    return <div className={styles.errorContainer}>
        <Error statusCode={500} style={{backgroundColor: 'unset'}}/>
    </div>
}
