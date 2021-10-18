import {useEffect} from "react";
import {useHistory} from "react-router-dom";

const Logout = () => {

    const history = useHistory();

    useEffect(()=>{
        sessionStorage.removeItem("JWT");
        sessionStorage.removeItem("user");
        history.push('/auth/admin')
        window.location.reload()
    })

    return(
        <>
            <div>
                Logout
            </div>
        </>
    )
}

export default Logout