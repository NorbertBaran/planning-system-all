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
    const labels = ['Nr', 'Nazwa', 'Placówka', 'Brygadzista', '']
    const sizing = '0.2fr 1fr 1fr 1fr 120px'
    const deleteMethod = (id) => deleteEmployer(id, data, setData)
    const template = (nr, rowData) => {
        return [
            <Text content={nr} variant='bold'/>,
            <Text content={rowData.name}/>,
            <Text content={rowData.place}/>,
            <DoubleLineText firstLine={rowData.leader.name + rowData.leader.lastName} secondLine={rowData.leader.phone}/>,
            <div className='Center'>
                <Button icon={<DeleteForever fontSize='small'/>} text='Usuń' onClick={()=>deleteMethod(rowData.id)}/>
            </div>
        ]
    }
    const getTeamEmployerList = (nr) => {
        dispatch(setTeamEmployerNr(nr))
        getTeamEmployers(data[nr].id, teamEmployers, (employers)=>dispatch(setTeamEmployers(employers)))
        dispatch(setTeamEmployerTeamId(data[nr].id))
    }
    const modalInputs = getTeamModalInputs(addTeam, (name)=>dispatch(setTeamName(name)), (city)=>dispatch(setTeamCity(city)), (username)=>dispatch(setTeamUsername(username)))
    const modalOnClick = () => saveTeam(addTeam, data, setData)
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={data} onClick={getTeamEmployerList} active={addTeamEmployer.nr} cursor='pointer'/>
            <Modal title='Dodaj brygadę' inputs={modalInputs} onClick={modalOnClick} onCleaning={()=>dispatch(clearAllTeam())} validate={addTeam.validation} setValidate={(validation)=>dispatch(setTeamValidation(validation))}/>
            <div className='Right'>
                <Button icon={<Add fontSize='small'/>} text='Dodaj' onClick={() => openDialog()}/>
            </div>
        </>

    )
}

export const TeamEmployersList = () => {
    const addTeamEmployer = useSelector(state => state.addTeamEmployer)
    const dispatch = useDispatch();
    const teamEmployers = useSelector(state => state.teamEmployers)
    const history = useHistory();
    const labels = ['Nr', 'Imię i Nazwisko', 'Wiek', 'Stanowisko', 'Wynagrodzenie', '']
    const sizing = '0.2fr 1.1fr 0.5fr 0.8fr 1fr 120px'
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
            <Text variant='special' content={rowData.salary + ' PLN'}/>,
            <div className='Center'>
                <Button icon={<DeleteForever fontSize='small'/>} text='Usuń' onClick={()=>deleteMethod(rowData.username)}/>
            </div>
        ]
    }
    const modal2Inputs = [<Input background='white' placeholder='Nazwa użytkownika' inputState={addTeamEmployer.username} setInputState={(username)=>dispatch(setTeamEmployerUsername(username))}/>]
    const modal2OnClick = () => {
        addEmployerToTeam(addTeamEmployer, addTeamEmployer.teamId, addTeamEmployer.teamId, addTeamEmployer.username, teamEmployers, (employers)=>dispatch(setTeamEmployers(employers)))
        //getTeamEmployers(addTeamEmployer.teamId, teamEmployers, (employers)=>dispatch(setTeamEmployers(employers)))
    }
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={teamEmployers}/>
            <Modal title='Dodaj pracownika' inputs={modal2Inputs} onClick={modal2OnClick} onCleaning={()=>dispatch(setTeamEmployerUsername(''))} validate={addTeamEmployer.validation} setValidate={(validation)=>dispatch(setTeamEmployerValidation(validation))} id='modal2'/>
            <div className='Right'>
                <Button icon={<Add fontSize='small'/>} text='Dodaj' onClick={() => openDialog('modal2')}/>
            </div>
        </>
    )
}