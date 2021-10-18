import Input from "../../../components/Input/Input";
import {Search} from "@material-ui/icons";
import {post, get, del, put} from "../../../api/RestApi";

export const getTaskModalInputs = (addTask, setName, setTeamName) => {
    return [
        <Input background='white' placeholder='Nazwa' inputState={addTask.name} setInputState={setName}/>,
        <Input background='white' placeholder='Nawa teamu' inputState={addTask.teamName} setInputState={setTeamName}/>
    ]
}

export const saveTask = (addTask, data, setData) => {
    const postMethod = async () => {
        try {
            const dto = {
                name: addTask.name,
                team: {
                    name: addTask.teamName
                },
                notExpired: true
            }
            const task = await post('http://localhost:8080/api/tasks', dto, sessionStorage.getItem("JWT"))
            setData([...data, task])
        }catch (exception){
            alert("Niepoprawne dane")
        }
    }
    if(addTask.validation === false)
        alert("Wszystkie pola są obowiązkowe")
    else
        postMethod()
}

export const getTaskTools = (id, state, setState) => {
    const getMethod = async () => {
        try{
            const tools = await get('http://localhost:8080/api/tools?taskId='+id, sessionStorage.getItem("JWT"))
            console.log(tools)
            setState(tools)
        } catch (exception){}
    }
    getMethod()
    console.log(state)
}

export const addToolToTask = (addToolTask, taskId, setToolId, name, state, setState) => {
    const putMethod = async () => {
        try{
            const tool = await get('http://localhost:8080/api/tools/'+name, sessionStorage.getItem("JWT"))
            const dto = {
                id: tool.id,
                task: {
                    id: setToolId !== null ? setToolId : -1
                }
            }
            await put('http://localhost:8080/api/tools', dto, sessionStorage.getItem("JWT"))
            const tools = await get('http://localhost:8080/api/tools?taskId='+taskId, sessionStorage.getItem("JWT"))
            setState(tools)
        } catch (exception){
            alert("Brak narzędzia o wskazanej nazwie")
        }
    }
    if(setToolId != null && addToolTask.validation === false)
        alert("Wszystkie pola są obowiązkowe")
    else
        putMethod()
}


export const getTaskMaterials = (id, state, setState) => {
    const getMethod = async () => {
        try{
            const materials = await get('http://localhost:8080/api/materials?taskId='+id, sessionStorage.getItem("JWT"))
            console.log(materials)
            setState(materials)
        } catch (exception){}
    }
    getMethod()
    console.log(state)
}

export const addMaterialToTask = (addMaterialTask, taskId, setMaterialId, name, state, setState) => {
    const putMethod = async () => {
        try{
            const material = await get('http://localhost:8080/api/materials/'+name, sessionStorage.getItem("JWT"))
            const dto = {
                id: material.id,
                task: {
                    id: setMaterialId !== null ? setMaterialId : -1
                }
            }
            console.log(setMaterialId)
            console.log(dto)
            await put('http://localhost:8080/api/materials', dto, sessionStorage.getItem("JWT"))
            const materials = await get('http://localhost:8080/api/materials?taskId='+taskId, sessionStorage.getItem("JWT"))
            setState(materials)
        } catch (exception){
            alert("Brak materiału o wskazanej nazwie")
        }
    }
    if(setMaterialId != null && addMaterialTask.validation === false)
        alert("Wszystkie pola są obowiązkowe")
    else
        putMethod()
}


export const deleteTask = (id, data, setData) => {
    const deleteTaskAsync = async () => {
        try {
            await del('http://localhost:8080/api/tasks/'+id, sessionStorage.getItem('JWT'))
            setData(data.filter((team) => team.id !== id))
        }catch (exception){

        }
    }
    deleteTaskAsync()
}