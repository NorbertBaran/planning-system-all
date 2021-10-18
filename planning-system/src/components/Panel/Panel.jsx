import AdminMenu from "../Menu/AdminMenu";
import Body from "../Body/Body";
import Head from "../Head/Head";
import {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {useSelector} from "react-redux";
import EmployerMenu from "../Menu/EmployerMenu";

const Panel = () => {
    const history = useHistory();

    useEffect(()=>{
        const checkAuthorities = async () => {
            if(sessionStorage.getItem("JWT") === null)
                history.push("/auth/admin");
        }
        checkAuthorities()
    },[])

    return(
        <>
            <div className='FixTop'>
                <Head/>
                {sessionStorage.getItem("user") === "Admin" ? <AdminMenu/> : <EmployerMenu/>}
            </div>
            <Body/>
        </>
    )
}

export default Panel