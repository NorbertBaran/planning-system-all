import styles from './Text.module.css'

const Text = ({content, variant='classic'}) => {

    function getVariant(variant){
        if(variant === 'classic')
            return styles.Classic;
        if(variant === 'bold')
            return styles.Bold;
        if(variant === 'special')
            return styles.Special;
    }

    return(
        <div className={getVariant(variant)}>{content}</div>
    )
}

export default Text