import {combineReducers} from "redux";

const addTeamReducer = (state = {name: '', city: '', username: '', validation: false}, action) => {
    switch (action.type){
        case 'SET_TEAM_NAME':
            return {name: action.payload, city: state.city, username: state.username, validation: state.validation}
        case 'SET_TEAM_CITY':
            return {name: state.name, city: action.payload, username: state.username, validation: state.validation}
        case 'SET_TEAM_USERNAME':
            return {name: state.name, city: state.city, username: action.payload, validation: state.validation}
        case 'SET_TEAM_VALIDATION':
            return {name: state.name, city: state.city, username: state.username, validation: action.payload}
        case 'CLEAR_ALL_TEAM':
            return {name: '', city: '', username: '', validation: state.validation}
        default:
            return state
    }
}

const registerReducer = (state = {
    step: 1, username: '', password: '', passwordRepeat: '',
    name: '', lastName: '', age: '', pessel: '',
    street: '', city: '', cityCode: '', phone: '',
    companyName: '', role: '', position: '', salary: '', validation: false
}, action) => {
    switch (action.type){
        case 'SET_REGISTER_STEP':
            return {
                step: action.payload, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_USERNAME':
            return {
                step: state.step, username: action.payload, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_PASSWORD':
            return {
                step: state.step, username: state.username, password: action.payload, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_PASSWORD_REPEAT':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: action.payload,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_NAME':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: action.payload, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_LAST_NAME':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: action.payload, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_AGE':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: action.payload, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_PESSEL':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: action.payload,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_STREET':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: action.payload, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_CITY':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: action.payload, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_CITY_CODE':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: action.payload, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_PHONE':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: action.payload,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_COMPANY_NAME':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: action.payload, role: state.role, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_ROLE':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: action.payload, position: state.position, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_POSITION':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: action.payload, salary: state.salary, validation: state.validation
            }
        case 'SET_REGISTER_SALARY':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: action.payload, validation: state.validation
            }
        case 'SET_REGISTER_VALIDATION':
            return {
                step: state.step, username: state.username, password: state.password, passwordRepeat: state.passwordRepeat,
                name: state.name, lastName: state.lastName, age: state.age, pessel: state.pessel,
                street: state.street, city: state.city, cityCode: state.cityCode, phone: state.phone,
                companyName: state.companyName, role: state.role, position: state.position, salary: state.salary, validation: action.payload
            }
        case 'CLEAR_ALL_REGISTER':
            return {
                step: 1, username: '', password: '', passwordRepeat: '',
                name: '', lastName: '', age: '', pessel: '',
                street: '', city: '', cityCode: '', phone: '',
                companyName: '', role: '', position: '', salary: '', validation: false
            }
        default:
            return state
    }
}

const teamEmployersReducer = (state=[], action) => {
    switch (action.type){
        case 'SET_TEAM_EMPLOYERS':
            return action.payload
        default:
            return state
    }
}

const addTeamEmployerReducer = (state={nr: -1, teamId: -1, employerId: -1, username: '', validation: false}, action) => {
    switch (action.type){
        case 'SET_TEAM_EMPLOYER_USERNAME':
            return {nr: state.nr, teamId: state.teamId, employerId: state.employerId, username: action.payload, validation: state.validation}
        case 'SET_TEAM_EMPLOYER_VALIDATION':
            return {nr: state.nr, teamId: state.teamId, employerId: state.employerId, username: state.username, validation: action.payload}
        case 'SET_TEAM_EMPLOYER_TEAM_ID':
            return {nr: state.nr, teamId: action.payload, employerId: state.employerId, username: state.username, validation: state.validation}
        case 'SET_TEAM_EMPLOYER_ID':
            return {nr: state.nr, teamId: state.teamId, employerId: action.payload, username: state.username, validation: state.validation}
        case 'SET_TEAM_EMPLOYER_NR':
            return {nr: action.payload, teamId: state.teamId, employerId: state.employerId, username: state.username, validation: state.validation}
        default:
            return state
    }
}

const addToolReducer = (state={category: '', name: '', model: '', identityNo: '', validation: false}, action) => {
    switch (action.type){
        case 'SET_TOOL_CATEGORY':
            return {category: action.payload, name: state.name, model: state.model, identityNo: state.identityNo, validation: state.validation}
        case 'SET_TOOL_NAME':
            return {category: state.category, name: action.payload, model: state.model, identityNo: state.identityNo, validation: state.validation}
        case 'SET_TOOL_MODEL':
            return {category: state.category, name: state.name, model: action.payload, identityNo: state.identityNo, validation: state.validation}
        case 'SET_TOOL_IDENTITY_NO':
            return {category: state.category, name: state.name, model: state.model, identityNo: action.payload, validation: state.validation}
        case 'SET_TOOL_VALIDATION':
            return {category: state.category, name: state.name, model: state.model, identityNo: state.identityNo, validation: action.payload}
        case 'CLEAR_ALL_TOOL':
            return {category: '', name: '', model: '', identityNo: '', validation: false}
        default:
            return state
    }
}

const addMaterialReducer = (state={category: '', name: '', supplier: '', count: '', measure: '', validation: false}, action) => {
    switch (action.type){
        case 'SET_MATERIAL_CATEGORY':
            return {category: action.payload, name: state.name, supplier: state.supplier, count: state.count, measure: state.measure, validation: state.validation}
        case 'SET_MATERIAL_NAME':
            return {category: state.category, name: action.payload, supplier: state.supplier, count: state.count, measure: state.measure, validation: state.validation}
        case 'SET_MATERIAL_SUPPLIER':
            return {category: state.category, name: state.name, supplier: action.payload, count: state.count, measure: state.measure, validation: state.validation}
        case 'SET_MATERIAL_COUNT':
            return {category: state.category, name: state.name, supplier: state.supplier, count: action.payload, measure: state.measure, validation: state.validation}
        case 'SET_MATERIAL_MEASURE':
            return {category: state.category, name: state.name, supplier: state.supplier, count: state.count, measure: action.payload, validation: state.validation}
        case 'SET_MATERIAL_VALIDATION':
            return {category: state.category, name: state.name, supplier: state.supplier, count: state.count, measure: state.measure, validation: action.payload}
        case 'CLEAR_ALL_MATERIAL':
            return {category: '', name: '', supplier: '', count: '', measure: '', validation: false}
        default:
            return state
    }
}

const addTaskReducer = (state={name: '', teamName: '', validation: false}, action) => {
    switch (action.type){
        case 'SET_TASK_NAME':
            return {name: action.payload, teamName: state.teamName, validation: state.validation}
        case 'SET_TASK_TEAM_NAME':
            return {name: state.name, teamName: action.payload, validation: state.validation}
        case 'SET_TASK_VALIDATION':
            return {name: state.name, teamName: state.teamName, validation: action.payload}
        case 'CLEAR_ALL_TASK':
            return {name: '', teamName: '', validation: false}
        default:
            return state
    }
}

const taskToolsReducer = (state=[], action) => {
    switch (action.type){
        case 'SET_TASK_TOOLS':
            return action.payload
        default:
            return state
    }
}

const addTaskToolReducer = (state={nr: -1, taskId: -1, toolId: -1, toolName: '', validation: false}, action) => {
    switch (action.type){
        case 'SET_TASK_TOOL_NR':
            return {nr: action.payload, taskId: state.taskId, toolId: state.taskId, toolName: state.toolName, validation: state.validation}
        case 'SET_TASK_TOOL_TASK_ID':
            return {nr: state.nr, taskId: action.payload, toolId: state.taskId, toolName: state.toolName, validation: state.validation}
        case 'SET_TASK_TOOL_TOOL_ID':
            return {nr: state.nr, taskId: state.taskId, toolId: action.payload, toolName: state.toolName, validation: state.validation}
        case 'SET_TASK_TOOL_TOOL_NAME':
            return {nr: state.nr, taskId: state.taskId, toolId: state.taskId, toolName: action.payload, validation: state.validation}
        case 'SET_TASK_TOOL_VALIDATION':
            return {nr: state.nr, taskId: state.taskId, toolId: state.taskId, toolName: state.toolName, validation: action.payload}
        case 'CLEAR_ALL_TASK_TOOL':
            return {nr: -1, taskId: -1, toolId: -1, toolName: '', validation: false}
        default:
            return state
    }
}

const taskMaterialsReducer = (state=[], action) => {
    switch (action.type){
        case 'SET_TASK_MATERIALS':
            return action.payload
        default:
            return state
    }
}

const addTaskMaterialReducer = (state={nr: -1, taskId: -1, materialId: -1, materialName: '', validation: false}, action) => {
    switch (action.type){
        case 'SET_TASK_MATERIAL_NR':
            return {nr: action.payload, taskId: state.taskId, toolId: state.taskId, materialName: state.materialName, validation: state.validation}
        case 'SET_TASK_MATERIAL_TASK_ID':
            return {nr: state.nr, taskId: action.payload, toolId: state.taskId, materialName: state.materialName, validation: state.validation}
        case 'SET_TASK_MATERIAL_MATERIAL_ID':
            return {nr: state.nr, taskId: state.taskId, toolId: action.payload, materialName: state.materialName, validation: state.validation}
        case 'SET_TASK_MATERIAL_MATERIAL_NAME':
            return {nr: state.nr, taskId: state.taskId, toolId: state.taskId, materialName: action.payload, validation: state.validation}
        case 'SET_TASK_MATERIAL_VALIDATION':
            return {nr: state.nr, taskId: state.taskId, toolId: state.taskId, materialName: state.materialName, validation: action.payload}
        case 'CLEAR_ALL_TASK_MATERIAL':
            return {nr: -1, taskId: -1, materialId: -1, materialName: '', validation: false}
        default:
            return state
    }
}

const reducers = combineReducers({
    addTeam: addTeamReducer,
    register: registerReducer,
    teamEmployers: teamEmployersReducer,
    addTeamEmployer: addTeamEmployerReducer,
    addTool: addToolReducer,
    addMaterial: addMaterialReducer,
    addTask: addTaskReducer,
    taskTools: taskToolsReducer,
    addTaskTool: addTaskToolReducer,
    taskMaterials: taskMaterialsReducer,
    addTaskMaterial: addTaskMaterialReducer,
})

export default reducers