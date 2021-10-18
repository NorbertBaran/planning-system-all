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

const AdminMenu = () => {
    return(
        <div className={styles.Menu}>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/employers'>
                <Option icon={<Person/>} text='Pracownicy'/>
            </NavLink>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/teams'>
                <Option icon={<People/>} text='Zespoły'/>
            </NavLink>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/tasks'>
                <Option icon={<Assignment/>} text='Zadania'/>
            </NavLink>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/tools'>
                <Option icon={<Build/>} text='Narzędzia'/>
            </NavLink>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/materials'>
                <Option icon={<Layers/>} text='Zasoby'/>
            </NavLink>
            <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/logout'>
                <Option icon={<PowerSettingsNew/>} text='Wyloguj'/>
            </NavLink>
            {/*<NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/reports'>
                    <Option icon={<Description/>} text='Raporty'/>
                </NavLink>
                <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/products'>
                    <Option icon={<ShoppingCart/>} text='Produkty'/>
                </NavLink>
                <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/finance'>
                    <Option icon={<AttachMoney/>} text='Finanse'/>
                </NavLink>
                <NavLink activeClassName={styles.ActiveLink} className={styles.Link} to='/admin/analytics'>
                    <Option icon={<Assessment/>} text='Zestawienia'/>
                </NavLink>*/}
        </div>
    )
}

export default AdminMenu