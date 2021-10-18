import {useHistory, useParams} from "react-router-dom";
import {del, get} from "../../../api/RestApi";
import Text from "../../../components/Text/Text";
import DoubleLineText from "../../../components/DoubleLineText/DoubleLineText";
import Button from "../../../components/Button/Button";
import {Add, DeleteForever, People} from "@material-ui/icons";
import {useEffect, useState} from "react";
import List from "../../../components/List/List";
import {addEmployerToTeam, deleteEmployer, getTeamEmployers, getTeamModalInputs, saveTeam} from "./Methods";
import {useDispatch, useSelector} from "react-redux";
import {
    clearAllTeam, setTeamCity,
    setTeamEmployerId, setTeamEmployerNr,
    setTeamEmployers,
    setTeamEmployerTeamId,
    setTeamEmployerUsername, setTeamEmployerValidation, setTeamName, setTeamUsername, setTeamValidation
} from "../../../redux/actions";
import Modal, {openDialog} from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";

export const TeamsList = ({data, setData}) => {
    const teamEmployers = useSelector(state => state.teamEmployers)
    const addTeam = useSelector(state => state.addTeam)
    const addTeamEmployer = useSelector(state => state.addTeamEmployer)
    const dispatch = useDispatch();
    const labels = ['Nazwa', 'Placówka', 'Brygadzista', 'Kontakt']
    const sizing = '1fr 1fr 1fr 1fr'
    const deleteMethod = (id) => deleteEmployer(id, data, setData)
    const template = (nr, rowData) => {
        return [
            <Text content={rowData.name}/>,
            <Text content={rowData.place}/>,
            <Text content={rowData.leader.name + rowData.leader.lastName}/>,
            <Text content={rowData.leader.phone}/>,
        ]
    }
    const getTeamEmployerList = (nr) => {
        dispatch(setTeamEmployerNr(nr))
        getTeamEmployers(data[nr].id, teamEmployers, (employers)=>dispatch(setTeamEmployers(employers)))
        dispatch(setTeamEmployerTeamId(data[nr].id))
    }

    useEffect(()=>{
        if(data.length > 0)
            getTeamEmployerList(0)
    }, [data])

    const modalInputs = getTeamModalInputs(addTeam, (name)=>dispatch(setTeamName(name)), (city)=>dispatch(setTeamCity(city)), (username)=>dispatch(setTeamUsername(username)))
    const modalOnClick = () => saveTeam(addTeam, data, setData)
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={data}/>
            <Modal title='Dodaj Team' inputs={modalInputs} onClick={modalOnClick} onCleaning={()=>dispatch(clearAllTeam())} validate={addTeam.validation} setValidate={(validation)=>dispatch(setTeamValidation(validation))}/>
        </>

    )
}

export const TeamEmployersList = () => {
    const addTeamEmployer = useSelector(state => state.addTeamEmployer)
    const dispatch = useDispatch();
    const teamEmployers = useSelector(state => state.teamEmployers)
    const history = useHistory();
    const labels = ['Nr', 'Imię i Nazwisko', 'Wiek', 'Stanowisko']
    const sizing = '0.2fr 1fr 1fr 1fr'
    const deleteMethod = (username) => {
        //addTeamEmployer.username
        //dispatch(setTeamEmployerUsername(username))
        addEmployerToTeam(addTeamEmployer, addTeamEmployer.teamId, null, username, teamEmployers, (employers)=>dispatch(setTeamEmployers(employers)))
    }
    const template = (nr, rowData) => {
        return [
            <Text content={nr} variant='bold'/>,
            <Text content={rowData.name + ' ' + rowData.lastName}/>,
            <Text content={rowData.age + ' lat'}/>,
            <Text content={rowData.position}/>,
        ]
    }
    const modal2Inputs = [<Input background='white' placeholder='Nazwa użytkownika' icon={<People/>} inputState={addTeamEmployer.username} setInputState={(username)=>dispatch(setTeamEmployerUsername(username))}/>]
    const modal2OnClick = () => {
        addEmployerToTeam(addTeamEmployer, addTeamEmployer.teamId, addTeamEmployer.teamId, addTeamEmployer.username, teamEmployers, (employers)=>dispatch(setTeamEmployers(employers)))
        //getTeamEmployers(addTeamEmployer.teamId, teamEmployers, (employers)=>dispatch(setTeamEmployers(employers)))
    }
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={teamEmployers}/>
            <Modal title='Dodaj brygadę' inputs={modal2Inputs} onClick={modal2OnClick} onCleaning={()=>dispatch(setTeamEmployerUsername(''))} validate={addTeamEmployer.validation} setValidate={(validation)=>dispatch(setTeamEmployerValidation(validation))} id='modal2'/>
        </>
    )
}