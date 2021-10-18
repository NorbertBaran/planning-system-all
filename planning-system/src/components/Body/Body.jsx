import styles from './Body.module.css'
import {Route} from 'react-router-dom'
import Team from "../../pages/EmployerPages/Team/Team";
import Task from "../../pages/EmployerPages/Task/Task";
import Tools from "../../pages/AdminPages/Tools/Tools";
import Materials from "../../pages/AdminPages/Materials/Materials";
import {useEffect, useState} from "react";
import {getEmployers} from "../../api/EmployersApi";
import Redirect from "../Redirect/Redirect";
import {get} from "../../api/RestApi";
import Logout from "../Logout/Logout";
import Teams from "../../pages/AdminPages/Teams/Teams";
import Tasks from "../../pages/AdminPages/Tasks/Tasks";
import Employers from "../../pages/AdminPages/Employers/Employers";

const Body = () => {

    const [employersDataActive, setEmployersDataActive] = useState([])
    const [employersDataArchival, setEmployersDataArchival] = useState([])

    const [teamsData, setTeamsData] = useState([])
    const [toolsData, setToolsData] = useState([])
    const [materialsData, setMaterialsData] = useState([])
    const [tasksData, setTasksData] = useState([])

    const [teamData, setTeamData] = useState([])
    const [taskData, setTaskData] = useState([])

    const getInitData = () => {
        const getInitDataAsync = async () => {
            try {
                const initEmployersDataActive = await getEmployers(sessionStorage.getItem("JWT"), true)
                setEmployersDataActive(initEmployersDataActive)
                const initEmployersDataArchival = await getEmployers(sessionStorage.getItem("JWT"), false)
                setEmployersDataArchival(initEmployersDataArchival)

                const initTeamsData = await get('http://localhost:8080/api/teams', sessionStorage.getItem("JWT"))
                setTeamsData(initTeamsData)
                const initToolsData = await get('http://localhost:8080/api/tools', sessionStorage.getItem("JWT"))
                setToolsData(initToolsData)
                const initMaterialsData = await get('http://localhost:8080/api/materials', sessionStorage.getItem("JWT"))
                setMaterialsData(initMaterialsData)
                const initTasksData = await get('http://localhost:8080/api/tasks', sessionStorage.getItem("JWT"))
                setTasksData(initTasksData)

                const initTeamData = await get('http://localhost:8080/api/teams/me', sessionStorage.getItem("JWT"))
                setTeamData(initTeamData)
                const initTaskData = await get('http://localhost:8080/api/tasks/me', sessionStorage.getItem("JWT"))
                setTaskData(initTaskData)
            }catch (exception){

            }
        }
        getInitDataAsync()
    }

    useEffect(()=>{
        getInitData()
    },[])

    return(
        <div className={styles.Body}>
            {/*<Route path='/admin/employers' exact render={()=>(<Redirect to='/admin/employers/active'/>)}/>
            <Route path='/admin/employers/active' render={()=>(<Employers data={employersDataActive} setData={setEmployersDataActive} reversedData={employersDataArchival} setReversedData={setEmployersDataArchival}/>)} />
            <Route path='/admin/employers/archival' render={()=>(<Employers data={employersDataArchival} setData={setEmployersDataArchival} reversedData={employersDataActive} setReversedData={setEmployersDataActive}/>)} />*/}
            <Route path='/admin/employers' render={()=>(<Employers data={employersDataActive} setData={setEmployersDataActive}/>)}/>
            <Route path='/admin/teams' render={()=>(<Teams data={teamsData} setData={setTeamsData}/>)}/>
            <Route path='/admin/tasks' render={()=><Tasks data={tasksData} setData={setTasksData}/>}/>
            <Route path='/admin/tools' render={()=><Tools data={toolsData} setData={setToolsData}/>}/>
            <Route path='/admin/materials' render={()=><Materials data={materialsData} setData={setMaterialsData}/> }/>
            <Route path='/admin/logout' component={Logout}/>

            <Route path='/employer/teams' render={()=>(<Team data={teamData} setData={setTeamData}/>)}/>
            <Route path='/employer/tasks' render={()=><Task data={taskData} setData={setTaskData}/>}/>
            <Route path='/employer/logout' component={Logout}/>
        </div>
    )
}

export default Body