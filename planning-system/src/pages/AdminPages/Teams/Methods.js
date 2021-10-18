import Input from "../../../components/Input/Input";
import {LocationCity, People, Person} from "@material-ui/icons";
import {del, get, post, put} from "../../../api/RestApi";

export const getTeamModalInputs = (addTeam, setName, setCity, setUsername) => {
    return [
        <Input background='white' placeholder='Nazwa teamu' inputState={addTeam.name} setInputState={setName}/>,
        <Input background='white' placeholder='Miejscowość' inputState={addTeam.city} setInputState={setCity}/>,
        <Input background='white' placeholder='Brygadzista(nazwa użytkownika)' inputState={addTeam.username} setInputState={setUsername}/>
    ]
}

export const saveTeam = (addTeam, data, setData) => {
    const postMethod = async () => {
        try {
            const dto = {
                name: addTeam.name,
                place: addTeam.city,
                leader: {
                    username: addTeam.username
                }
            }
            const team = await post('http://localhost:8080/api/teams', dto, sessionStorage.getItem("JWT"))
            setData([...data, team])
        }catch (exception){
            alert("Niepoprawne dane")
        }
    }
    if(addTeam.validation === false)
        alert("Wszystkie pola są obowiązkowe")
    else
        postMethod()
}

export const getTeamEmployers = (id, state, setState) => {
    const getMethod = async () => {
        try{
            const employers = await get('http://localhost:8080/api/employers?teamId='+id, sessionStorage.getItem("JWT"))
            console.log(employers)
            setState(employers)
        } catch (exception){}
    }
    getMethod()
    console.log(state)
}

export const getEmployerByUsername = (username, setEmployerId) => {
    const getMethod = async () => {
        try {
            console.log("T1")
            const employer = await get('http://localhost:8080/api/employers/'+username, sessionStorage.getItem("JWT"))
            console.log("T2")
            console.log(employer)
            setEmployerId(employer.id)
        } catch (exception){}
    }
    getMethod()
}

export const addEmployerToTeam = (addTeamEmployer, teamId, setTeamId, username, state, setState) => {
    const putMethod = async () => {
        try{
            const employer = await get('http://localhost:8080/api/employers/'+username, sessionStorage.getItem("JWT"))
            const dto = {
                id: employer.id,
                team: {
                    id: setTeamId !== null ? setTeamId : -1
                }
            }
            await put('http://localhost:8080/api/employers', dto, sessionStorage.getItem("JWT"))
            const employers = await get('http://localhost:8080/api/employers?teamId='+teamId, sessionStorage.getItem("JWT"))
            setState(employers)
        } catch (exception){
            alert("Brak pracownika o wskazanej nazwie")
        }
    }
    if(setTeamId != null && addTeamEmployer.validation === false)
        alert("Wszystkie pola są obowiązkowe")
    else
        putMethod()
}

export const deleteEmployer = (id, data, setData) => {
    const deleteEmployerAsync = async () => {
        try {
            await del('http://localhost:8080/api/teams/'+id, sessionStorage.getItem('JWT'))
            setData(data.filter((team) => team.id !== id))
        }catch (exception){

        }
    }
    deleteEmployerAsync()
}