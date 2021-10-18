import styles from "./AuthPages.module.css"
import Input from "../../components/Input/Input";
import {useState} from "react";
import {Person, Security, LockOpen} from "@material-ui/icons";
import Button from "../../components/Button/Button";
import {NavLink, useHistory} from "react-router-dom";
import {postLoginData} from "../../api/AuthApi";
import {useDispatch, useSelector} from "react-redux";
import {setUserType} from "../../redux/actions";

const AdminAuth = () => {
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {

        const getAuthTokenDto = async () => {
            try {
                const authTokenDto = await postLoginData(username, password)
                sessionStorage.setItem("JWT", authTokenDto.bearer)
                sessionStorage.setItem("user", "Admin");
                history.push("/admin/employers");
            }catch (exception){

            }
        }
        getAuthTokenDto()
    }

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
            <Input placeholder="Nazwa użytkownika" icon={<Person/>} inputState={username} setInputState={setUsername}/>
            <Input type="password" placeholder="Hasło" icon={<Security/>} inputState={password} setInputState={setPassword}/>
            <div className={styles.Submit}>
                <Button icon={<LockOpen fontSize='small'/>} text='Zaloguj' onClick={()=>login()}/>
            </div>
        </div>
    )
}

export default AdminAuth