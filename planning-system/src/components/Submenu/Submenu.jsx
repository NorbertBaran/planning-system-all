import styles from './Submenu.module.css'
import {NavLink} from "react-router-dom";

const Submenu = ({options=[]}) => {

    return(
        <div className={styles.Submenu}>
            {options.map((option, index)=>(
                <NavLink activeClassName={styles.Active} className={styles.Option} to={option.path}>
                    {option.value}
                </NavLink>
            ))}
        </div>
    )
}

export default Submenu