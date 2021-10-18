import {useDispatch, useSelector} from "react-redux";
import {del} from "../../../api/RestApi";
import Text from "../../../components/Text/Text";
import DoubleLineText from "../../../components/DoubleLineText/DoubleLineText";
import Button from "../../../components/Button/Button";
import {Add, DeleteForever} from "@material-ui/icons";
import {
    clearAllMaterial,
    clearAllTeam,
    clearAllTool, setMaterialCategory, setMaterialCount, setMaterialMeasure, setMaterialName, setMaterialSupplier,
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
import {getTeamEmployers, getTeamModalInputs} from "../Team/Methods";
import {useState} from "react";
import List from "../../../components/List/List";
import Modal, {openDialog} from "../../../components/Modal/Modal";
import {
    deleteMaterial,
    deleteTool,
    getMaterialModalInputs,
    getToolModalInputs,
    saveMaterial,
    saveTool
} from "./Methods";

export const MaterialsList = ({data, setData}) => {
    const addMaterial= useSelector(state => state.addMaterial)
    const dispatch = useDispatch();
    const labels = ['Nr', 'Kategoria', 'Nazwa', 'Dostawca', 'Ilość/miara', '']
    const sizing = '0.2fr 1fr 1fr 1fr 0.6fr 120px'
    const deleteMethod = (id) => deleteMaterial(id, data, setData)
    const template = (nr, rowData) => {
        return [
            <Text content={nr} variant='bold'/>,
            <Text content={rowData.category}/>,
            <Text content={rowData.name}/>,
            <Text content={rowData.supplier}/>,
            <DoubleLineText firstLine={rowData.count+' szt.'} secondLine={rowData.measure}/>,
            <div className='Center'>
                <Button icon={<DeleteForever fontSize='small'/>} text='Usuń' onClick={()=>deleteMethod(rowData.id)}/>
            </div>
        ]
    }

    const modalInputs = getMaterialModalInputs(addMaterial, (category)=>dispatch(setMaterialCategory(category)), (name)=>dispatch(setMaterialName(name)), (supplier)=>dispatch(setMaterialSupplier(supplier)), (count)=>dispatch(setMaterialCount(count)), (measure)=>dispatch(setMaterialMeasure(measure)))
    const modalOnClick = () => saveMaterial(addMaterial, data, setData)
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={data} cursor='pointer'/>
            <Modal title='Dodaj materiał' inputs={modalInputs} onClick={modalOnClick} onCleaning={()=>dispatch(clearAllMaterial())} validate={addMaterial.validation} setValidate={(validation)=>dispatch(setToolValidation(validation))}/>
            <div className='Right'>
                <Button icon={<Add fontSize='small'/>} text='Dodaj' onClick={() => openDialog()}/>
            </div>
        </>

    )
}