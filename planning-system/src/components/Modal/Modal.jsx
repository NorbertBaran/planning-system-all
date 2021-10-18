import styles from './Modal.module.css'
import Button from "../Button/Button";

import {Close, Add} from '@material-ui/icons';
import {useEffect, useState} from "react";
import modalStyles from "./Modal.module.css";

export const openDialog = (id='modal') =>{
    const modal = document.getElementById(id)
    modal.classList.add(modalStyles.ModalVisible)
}

const Modal = ({title, inputs=[], id='modal', onClick, onCleaning=()=>{}, validate, setValidate}) => {

    const closeDialog = (id) => {
        onCleaning()
        const modal = document.getElementById(id)
        modal.classList.remove(styles.ModalVisible)
        setValidate(false)
    }

    const add = (id) => {
        onClick()
        if(validate)
            closeDialog(id)
    }

    return(
        <div className={styles.Modal} id={id}>
            <div className={styles.ModalContainer}>
                <h2>{title}</h2>
                <div className={styles.Inputs}>
                    {inputs.map((input, index)=>(
                        <div key={index}>
                            {input}
                        </div>
                    ))}
                </div>
                <div className={styles.Buttons}>

                </div>
                <div className={styles.Buttons}>
                    <Button icon={<Close fontSize='small'/>} text='Anuluj' onClick={()=>closeDialog(id)}/>
                    <Button icon={<Add fontSize='small'/>} text='Dodaj' onClick={()=>add(id)}/>
                </div>
            </div>
        </div>
    )
}

export default Modal