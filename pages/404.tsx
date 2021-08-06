import styles from '../styles/Components.module.scss'
import Error from 'next/error'

export default function FourOFour() {
    return <div className={styles.errorContainer}>
        <Error statusCode={404} style={{backgroundColor: 'unset'}}/>
    </div>
}
