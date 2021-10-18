import styles from "./AuthPages.module.css"
import {NavLink, useHistory} from "react-router-dom";
import RegistrationPanel from "./RegistrationPanel";

const Registration = () => {
    return(
        <div className={styles.AuthPages}>
            <div className={styles.NavLinks}>
                <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/auth/admin'>
                    Admin Panel
                </NavLink>
                <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/auth/user'>
                    Dashboard
                </NavLink>
                <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/auth/registration'>
                    Rejestracja
                </NavLink>
            </div>
            <RegistrationPanel/>
        </div>
    )
}

export default Registration