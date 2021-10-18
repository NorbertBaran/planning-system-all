import styles from '../MenuPages.module.css'
import List from "../../../components/List/List";
import Text from "../../../components/Text/Text";
import DoubleLineText from "../../../components/DoubleLineText/DoubleLineText";
import {ExpandMore} from "@material-ui/icons";
import {TaskList, TaskMaterialsList, TaskToolsList} from "./List";
import {TeamEmployersList, TeamsList} from "../Team/List";
import {useEffect} from "react";
import {
    setTaskMaterialValidation,
    setTaskToolValidation,
    setTaskValidation,
    setTeamEmployerValidation,
    setTeamValidation
} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const Tasks = ({data, setData}) => {
    const addTask = useSelector(state => state.addTask)
    const addTaskTool = useSelector(state => state.addTaskTool)
    const addTaskMaterial = useSelector(state => state.addTaskMaterial)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(addTask.name === '' || addTask.teamName === '')
            dispatch(setTaskValidation(false))
        else
            dispatch(setTaskValidation(true))
        if(addTaskTool.toolName === '')
            dispatch(setTaskToolValidation(false))
        else
            dispatch(setTaskToolValidation(true))
        if(addTaskMaterial.materialName === '')
            dispatch(setTaskMaterialValidation(false))
        else
            dispatch(setTaskMaterialValidation(true))
    }, [addTask.name, addTask.teamName, addTaskTool.toolName, addTaskMaterial.materialName])
    return(
        <div className={styles.HorizontalSplit2}>
            <div>
                <p className={styles.Header}>Zadania</p>
                {/*<List labels={labels} sizing={sizing} template={template} data={data}/>*/}
                <TaskList data={data} setData={setData}/>
            </div>
            <div>
                {addTaskTool.taskId !== -1 ?
                    <>
                        <p className={styles.Header}>Narzędzia</p>
                        <TaskToolsList/>
                        <p className={styles.Header}>Materiały</p>
                        <TaskMaterialsList/>
                    </> :
                    <p className={styles.Header}>Wybierz zadanie, aby zarządzać jego zasobami</p>
                }
            </div>
        </div>
    )
}

export default Tasks