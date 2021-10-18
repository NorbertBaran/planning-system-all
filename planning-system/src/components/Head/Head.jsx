import styles from './Head.module.css'
import logo from '../../logo.svg'
import profileImg from '../../img/profile.png'
import {useEffect, useState} from "react";
import {get} from "../../api/RestApi";

const Head = () => {
    const profile = profileImg

    const [companyName, setCompanyName] = useState("")

    const getCompany = () => {
        const getMethod = async () => {
            try{
                const company = await get('http://localhost:8080/api/company', sessionStorage.getItem("JWT"))
                console.log(company)
                setCompanyName(company.name)
            } catch (exception){}
        }
        getMethod()
    }

    useEffect(()=>{
        console.log("Head")
        getCompany()
    })

    return(
        <div className={styles.Head}>
            <img src={logo} alt='Logo'/>
            <p>Planning System</p>
            <p>{companyName}</p>
            <img src={profile} alt='Profile'/>
        </div>
    )
}

export default Head