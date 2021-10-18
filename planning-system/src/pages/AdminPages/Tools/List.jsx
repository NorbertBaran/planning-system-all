import {useDispatch, useSelector} from "react-redux";
import {del} from "../../../api/RestApi";
import Text from "../../../components/Text/Text";
import DoubleLineText from "../../../components/DoubleLineText/DoubleLineText";
import Button from "../../../components/Button/Button";
import {Add, DeleteForever} from "@material-ui/icons";
import {
    clearAllTeam,
    clearAllTool,
    setTeamCity,
    setTeamEmployerNr,
    setTeamEmployers,
    setTeamEmployerTeamId,
    setTeamName,
    setTeamUsername,
    setTeamValidation,
    setToolCategory,
    setToolIdentityNo,
    setToolModel,
    setToolName,
    setToolValidation
} from "../../../redux/actions";
import {getTeamEmployers, getTeamModalInputs} from "../Teams/Methods";
import {useState} from "react";
import List from "../../../components/List/List";
import Modal, {openDialog} from "../../../components/Modal/Modal";
import {deleteTool, getToolModalInputs, saveTool} from "./Methods";

export const ToolsList = ({data, setData}) => {
    const addTool= useSelector(state => state.addTool)
    const dispatch = useDispatch();
    const labels = ['Nr', 'Kategoria', 'Nazwa', 'Model', 'Nr seryjny', '']
    const sizing = '0.2fr 1fr 1fr 1fr 1fr 120px'
    const deleteMethod = (id) => deleteTool(id, data, setData)
    const template = (nr, rowData) => {
        return [
            <Text content={nr} variant='bold'/>,
            <Text content={rowData.category}/>,
            <Text content={rowData.name}/>,
            <Text content={rowData.model}/>,
            <Text content={rowData.identityNo}/>,
            /*<DoubleLineText firstLine={rowData.model} secondLine={rowData.identityNo}/>,
            <Text content={rowData.buyDate}/>,
            <DoubleLineText firstLine={rowData.price+' PLN'} secondLine={1.23*rowData.price+' PLN'}/>,*/
            <div className='Center'>
                <Button icon={<DeleteForever fontSize='small'/>} text='Usuń' onClick={()=>deleteMethod(rowData.id)}/>
            </div>
        ]
    }

    const modalInputs = getToolModalInputs(addTool, (category)=>dispatch(setToolCategory(category)), (name)=>dispatch(setToolName(name)), (model)=>dispatch(setToolModel(model)), (identityNo)=>dispatch(setToolIdentityNo(identityNo)))
    const modalOnClick = () => saveTool(addTool, data, setData)
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={data} cursor='pointer'/>
            <Modal title='Dodaj narzędzie' inputs={modalInputs} onClick={modalOnClick} onCleaning={()=>dispatch(clearAllTool())} validate={addTool.validation} setValidate={(validation)=>dispatch(setToolValidation(validation))}/>
            <div className='Right'>
                <Button icon={<Add fontSize='small'/>} text='Dodaj' onClick={() => openDialog()}/>
            </div>
        </>

    )
}