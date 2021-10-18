import styles from './Button.module.css'

const Button = ({icon, text, onClick}) => {
    return(
        <div className={styles.ButtonContainer}>
            <div className={styles.Button} onClick={()=>onClick()}>
                {icon}
                <p className={styles.Text}>{text}</p>
            </div>
        </div>
    )
}

export default Button

