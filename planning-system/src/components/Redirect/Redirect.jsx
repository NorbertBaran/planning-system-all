import {useEffect} from "react";
import {useHistory} from "react-router-dom";

const Redirect = ({to}) => {

    const history = useHistory();

    useEffect(()=>{
        history.push(to)
    })

    return(
        <></>
    )
}

export default Redirect