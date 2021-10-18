import styles from './Menu.module.css'
import {
    Person,
    People,
    Assignment,
    Build,
    Layers,
    ShoppingCart,
    AttachMoney,
    Assessment,
    Description,
    PowerSettingsNew
} from '@material-ui/icons';
import {NavLink} from 'react-router-dom'
import {useSelector} from "react-redux";

const Option = ({icon, text}) => {
    return(
        <div className={styles.Option}>
            {icon}
            <p>{text}</p>
        </div>
    )
}

const EmployerMenu = () => {
    return(
        <div className={styles.Menu}>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/employer/teams'>
                <Option icon={<People/>} text='Zespół'/>
            </NavLink>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/employer/tasks'>
                <Option icon={<Assignment/>} text='Zadania'/>
            </NavLink>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/employer/logout'>
                <Option icon={<PowerSettingsNew/>} text='Wyloguj'/>
            </NavLink>
        </div>
    )
}

export default EmployerMenu