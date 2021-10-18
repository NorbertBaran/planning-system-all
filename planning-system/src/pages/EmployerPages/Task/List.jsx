import Text from "../../../components/Text/Text";
import DoubleLineText from "../../../components/DoubleLineText/DoubleLineText";
import Button from "../../../components/Button/Button";
import {Add, DeleteForever, ExpandMore, People} from "@material-ui/icons";
import List from "../../../components/List/List";
import {
    addMaterialToTask,
    addToolToTask,
    deleteTask, finishTask, getTaskMaterials,
    getTaskModalInputs, getTaskTools,
    saveTask,
} from "./Methods";
import {useDispatch, useSelector} from "react-redux";
import {
    clearAllMaterial,
    clearAllTask, clearAllTaskMaterial, clearAllTaskTool, clearAllTool,
    setTaskMaterialMaterialId,
    setTaskMaterialMaterialName,
    setTaskMaterialNr,
    setTaskMaterials, setTaskMaterialTaskId,
    setTaskMaterialValidation,
    setTaskName,
    setTaskTeamName,
    setTaskToolNr,
    setTaskTools,
    setTaskToolTaskId,
    setTaskToolToolName,
    setTaskToolValidation,
    setTaskValidation,
    setTeamEmployerNr,
    setTeamEmployerTeamId,
} from "../../../redux/actions";
import Modal, {openDialog} from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";

export const TaskList = ({data, setData}) => {
    const taskTools = useSelector(state => state.taskTools)
    const taskMaterials = useSelector(state => state.taskMaterials)
    const addTask = useSelector(state => state.addTask)
    const addTaskTool = useSelector(state => state.addTaskTool)
    const dispatch = useDispatch();

    const labels = ['', 'Nazwa', 'Team/Brygadzista', '']
    const sizing = '0.2fr 1.2fr 1.2fr 120px'
    const deleteMethod = (id) => {
        finishTask(id, data, setData, ()=>{
            dispatch(setTaskTools([]))
            dispatch(setTaskMaterials([]))
        })
        /*clearAllTaskTool()
        clearAllTaskMaterial()
        setTaskTools([])
        setTaskMaterials([])*/
    }
    const template = (nr, rowData) => {
        return [
            <Text content={nr} variant='bold'/>,
            <Text content={rowData.name}/>,
            <DoubleLineText firstLine={rowData.team.name} secondLine={rowData.team.leader.name + ' ' + rowData.team.leader.lastName}/>,
            <div className='Center'>
                <Button icon={<DeleteForever fontSize='small'/>} text='Wykonaj' onClick={()=>deleteMethod(rowData.id)}/>
            </div>
        ]
    }
    const getTaskToolsList = (nr) => {
        dispatch(setTaskToolNr(nr))
        dispatch(setTaskMaterialNr(nr))
        getTaskTools(data[nr].id, taskTools, (tools)=>dispatch(setTaskTools(tools)))
        getTaskMaterials(data[nr].id, taskMaterials, (materials)=>dispatch(setTaskMaterials(materials)))
        dispatch(setTaskToolTaskId(data[nr].id))
        dispatch(setTaskMaterialTaskId(data[nr].id))
    }
    const modalInputs = getTaskModalInputs(addTask, (name)=>dispatch(setTaskName(name)), (teamName)=>dispatch(setTaskTeamName(teamName)))
    const modalOnClick = () => saveTask(addTask, data, setData)
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={data} onClick={getTaskToolsList} active={addTaskTool.nr} cursor='pointer'/>
            <Modal title='Dodaj brygadzistę' inputs={modalInputs} onClick={modalOnClick} onCleaning={()=>dispatch(clearAllTask())} validate={addTask.validation} setValidate={(validation)=>dispatch(setTaskValidation(validation))}/>
        </>

    )
}


export const TaskToolsList = () => {
    const addTaskTool = useSelector(state => state.addTaskTool)
    const dispatch = useDispatch();
    const taskTools = useSelector(state => state.taskTools)
    const labels = ['Nr', 'Kategoria', 'Nazwa', 'Model', 'Nr seryjny']
    const sizing = '0.2fr 1fr 1fr 1fr 1fr'
    const deleteMethod = (toolName) => {
        addToolToTask(addTaskTool, addTaskTool.taskId, null, toolName, taskTools, (tools)=>dispatch(setTaskTools(tools)))
    }
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
        ]
    }
    const modal2Inputs = [<Input background='white' placeholder='Nazwa użytkownika' icon={<People/>} inputState={addTaskTool.toolName} setInputState={(toolName)=>dispatch(setTaskToolToolName(toolName))}/>]
    const modal2OnClick = () => {
        addToolToTask(addTaskTool, addTaskTool.taskId, addTaskTool.taskId, addTaskTool.toolName, taskTools, (tools)=>dispatch(setTaskTools(tools)))
    }
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={taskTools}/>
            <Modal title='Dodaj narzędzie' inputs={modal2Inputs} onClick={modal2OnClick} onCleaning={()=>dispatch(setTaskToolToolName(''))} validate={addTaskTool.validation} setValidate={(validation)=>dispatch(setTaskToolValidation(validation))} id='modal2'/>
        </>
    )
}

export const TaskMaterialsList = () => {
    const addTaskMaterial = useSelector(state => state.addTaskMaterial)
    const dispatch = useDispatch();
    const taskMaterials = useSelector(state => state.taskMaterials)
    const labels = ['Nr', 'Kategoria', 'Nazwa', 'Dostawca', 'Ilość/miara']
    const sizing = '0.2fr 1fr 1fr 1fr 1fr'
    const deleteMethod = (toolName) => {
        addMaterialToTask(addTaskMaterial, addTaskMaterial.taskId, null, toolName, taskMaterials, (materials)=>dispatch(setTaskMaterials(materials)))
    }
    const template = (nr, rowData) => {
        return [
            <Text content={nr} variant='bold'/>,
            <Text content={rowData.category}/>,
            <Text content={rowData.name}/>,
            <Text content={rowData.supplier}/>,
            <DoubleLineText firstLine={rowData.count+' szt.'} secondLine={rowData.measure}/>,
        ]
    }
    const modal2Inputs = [<Input background='white' placeholder='Nazwa materiału' icon={<People/>} inputState={addTaskMaterial.materialName} setInputState={(materialName)=>dispatch(setTaskMaterialMaterialName(materialName))}/>]
    const modal2OnClick = () => {
        addMaterialToTask(addTaskMaterial, addTaskMaterial.taskId, addTaskMaterial.taskId, addTaskMaterial.materialName, taskMaterials, (materials)=>dispatch(setTaskMaterials(materials)))
    }
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={taskMaterials}/>
            <Modal title='Dodaj materiał' inputs={modal2Inputs} onClick={modal2OnClick} onCleaning={()=>dispatch(setTaskMaterialMaterialName(''))} validate={addTaskMaterial.validation} setValidate={(validation)=>dispatch(setTaskMaterialValidation(validation))} id='modal3'/>
        </>
    )
}
