import styles from './DoubleLineText.module.css'

const DoubleLineText = ({firstLine, secondLine}) => {
    return(
        <div className={styles.DoubleLineText}>
            <div className={styles.FirstLine}>{firstLine}</div>
            <div className={styles.SecondLine}>{secondLine}</div>
        </div>
    )
}

export default DoubleLineText