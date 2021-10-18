import styles from "./AuthPages.module.css"
import {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import Input from "../../components/Input/Input";
import {LockOpen, Person, Security} from "@material-ui/icons";
import Button from "../../components/Button/Button";
import {postLoginData} from "../../api/AuthApi";
import {setUserType} from "../../redux/actions";
import {useDispatch} from "react-redux";

const UserAuth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {

        const getAuthTokenDto = async () => {
            try {
                const authTokenDto = await postLoginData(username, password)
                sessionStorage.setItem("JWT", authTokenDto.bearer)
                sessionStorage.setItem("user", "Employer");
                history.push("/employer/tasks");
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

export default UserAuth