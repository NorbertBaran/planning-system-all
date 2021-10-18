import styles from '../MenuPages.module.css'
import {Add, People} from "@material-ui/icons";
import Button from "../../../components/Button/Button";
import {useEffect, useState} from "react";
import Modal, {openDialog} from "../../../components/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {
    clearAllTeam,
    setTeamCity, setTeamEmployerId, setTeamEmployerTeamId,
    setTeamEmployerUsername, setTeamEmployerValidation,
    setTeamName,
    setTeamUsername,
    setTeamValidation
} from "../../../redux/actions";
import {addEmployerToTeam, addTeam, getEmployerByUsername, getTeamModalInputs} from "./Methods";
import {TeamEmployersList, TeamsList} from "./List";
import {Route, useHistory} from "react-router-dom";
import Input from "../../../components/Input/Input";

const Teams = ({data, setData}) => {
    const history = useHistory();
    const addTeam = useSelector(state => state.addTeam)
    const addTeamEmployer = useSelector(state => state.addTeamEmployer)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(addTeam.name === '' || addTeam.city === '' || addTeam.username === '')
            dispatch(setTeamValidation(false))
        else
            dispatch(setTeamValidation(true))
        if(addTeamEmployer.username === '')
            dispatch(setTeamEmployerValidation(false))
        else
            dispatch(setTeamEmployerValidation(true))
        //getEmployerByUsername(addTeamEmployer.username, (id)=>dispatch(setTeamEmployerId(id)))
    }, [addTeam.name, addTeam.city, addTeam.username, addTeamEmployer.username])

    return(
        <div className={styles.MenuPages}>
            <div>
                <p className={styles.Header}>Twój zespół</p>
                <TeamsList data={data} setData={setData}/>
            </div>
            <div>
                {addTeamEmployer.teamId !== -1 ?
                    <>
                        <p className={styles.Header}>Członkowie zespołu</p>
                        {/*<Route path={'/admin/teams/:teamId'} render={()=>(<TeamEmployersList/>)}/>*/}
                        <TeamEmployersList/>
                    </> :
                    <p className={styles.Header}></p>
                }
            </div>
        </div>
    )
}

export default Teams