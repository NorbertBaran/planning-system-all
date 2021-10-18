import {del, post} from "../../../api/RestApi";
import Input from "../../../components/Input/Input";
import {Search} from "@material-ui/icons";
import RegistrationPanel from "../../AuthPages/RegistrationPanel";

export const getEmployerModalInputs = () => {
    return [<RegistrationPanel type='add'/>]
}

export const saveEmployer = (register, data, setData) => {
    const postMethod = async () => {
        try {
            const dto = {
                username: register.username,
                name: register.name,
                lastName: register.lastName,
                age: register.age,
                pessel: register.pessel,
                street: register.street,
                cityCode: register.cityCode,
                city: register.city,
                phone: register.phone,
                position: register.position,
                salary: register.salary,
                password: register.password,
                role: register.role
            }
            const employer = await post('http://localhost:8080/api/employers', dto, sessionStorage.getItem("JWT"))
            setData([...data, employer])
        }catch (exception){
            alert("Niepoprawne dane")
        }
    }
    if(register.validation === false)
        alert("Wszystkie pola są obowiązkowe")
    else
        postMethod()
}

export const deleteEmployer = (id, data, setData) => {
    const deleteEmployerAsync = async () => {
        try {
            await del('http://localhost:8080/api/employers/'+id, sessionStorage.getItem('JWT'))
            setData(data.filter((team) => team.id !== id))
        }catch (exception){}
    }
    deleteEmployerAsync()
}