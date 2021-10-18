import styles from '../MenuPages.module.css'
import {EmployersList, MaterialsList} from "./List";
import {useEffect} from "react";
import {setMaterialValidation, setToolValidation} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const Employers = ({data, setData}) => {
    const register= useSelector(state => state.register)
    const dispatch = useDispatch();

    return(
        <div className={styles.MenuPages}>
            <EmployersList data={data} setData={setData}/>
        </div>
    )
}

export default Employers