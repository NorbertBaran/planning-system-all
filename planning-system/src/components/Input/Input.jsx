import styles from './Input.module.css'
import {useEffect} from "react";

const Input = ({placeholder, icon, background='default', inputState, setInputState, type="text", callback=()=>{}}) => {

    useEffect(()=>{
        if(inputState!=="")
            callback()
    }, [inputState])

    const onInputChange = (e) => {
        setInputState(e.target.value)
    }

    return(
        <div>
            <div className={styles.InputGroup}>
                <input type={type} id="inputField" required className={styles.InputArea} onChange={(e)=>onInputChange(e)} value={inputState}/>
                <label style={background !== 'default' ? {backgroundColor: background} : {}}  htmlFor="inputField" className={styles.Label}>{placeholder}</label>
                <div className={styles.Icon}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default Input