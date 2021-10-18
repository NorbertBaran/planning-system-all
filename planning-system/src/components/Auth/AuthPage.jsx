import styles from './AuthPage.module.css'
import {Route} from "react-router-dom";
import UserAuth from "../../pages/AuthPages/UserAuth";
import AdminAuth from "../../pages/AuthPages/AdminAuth";
import Registration from "../../pages/AuthPages/Registration";
import {Business} from "@material-ui/icons";
import logo from "../../logo.svg"
import Redirect from "../Redirect/Redirect";

const AuthPage = () => {
    return(
        <div className={styles.AuthPage}>
            <div className={styles.AuthorizationAdd}>
                <div className={styles.Logo}>
                    <Business className={styles.LogoIcon}/>
                    <p>Planning System</p>
                </div>
                <img src={logo} alt='Planning System'/>
                <h2>System IT dla planowania oraz kontroli pracy przedsiębiorstwa</h2>
            </div>
            <div>
                <Route path='/auth' exact render={()=>(<Redirect to='/auth/admin'/>)}/>
                <Route path='/auth/user' component={UserAuth}/>
                <Route path='/auth/admin' component={AdminAuth}/>
                <Route path='/auth/registration' component={Registration}/>
            </div>
        </div>
    )
}

export default AuthPage