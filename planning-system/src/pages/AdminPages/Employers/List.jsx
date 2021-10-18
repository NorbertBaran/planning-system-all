import {useDispatch, useSelector} from "react-redux";
import {del} from "../../../api/RestApi";
import Text from "../../../components/Text/Text";
import DoubleLineText from "../../../components/DoubleLineText/DoubleLineText";
import Button from "../../../components/Button/Button";
import {Add, DeleteForever} from "@material-ui/icons";
import {
    clearAllRegister,
    setRegisterValidation,
} from "../../../redux/actions";
import List from "../../../components/List/List";
import Modal, {openDialog} from "../../../components/Modal/Modal";
import {
    deleteEmployer,
    getEmployerModalInputs, saveEmployer,
} from "./Methods";

export const EmployersList = ({data, setData}) => {
    const register= useSelector(state => state.register)
    const dispatch = useDispatch();
    const labels = ['Nr', 'Imię i nazwisko / Nazwa użytkownika', 'Wiek/Pesel', 'Adres', 'Kontakt', 'Stanowisko', 'Wynagrodzenie', 'Usuń']
    const sizing = '0.2fr 1.2fr 0.9fr 1.2fr 0.9fr 0.6fr 0.6fr 120px'
    const deleteMethod = (id) => deleteEmployer(id, data, setData)
    const template = (nr, rowData) => {
        console.log(rowData)
        return [
            <Text content={nr} variant='bold'/>,
            // <Text content={rowData.name+' '+rowData.lastName}/>,
            <DoubleLineText firstLine={rowData.name+' '+rowData.lastName} secondLine={rowData.username}/>,
            <DoubleLineText firstLine={rowData.age+' lat'} secondLine={rowData.pessel}/>,
            <DoubleLineText firstLine={rowData.street} secondLine={rowData.cityCode+' '+rowData.city}/>,
            <Text content={rowData.phone}/>,
            <Text content={rowData.position}/>,
            <Text content={rowData.salary+' PLN'} variant='special'/>,
            <div className='Center'>
                <Button icon={<DeleteForever fontSize='small'/>} text='Usuń' onClick={()=>deleteMethod(rowData.id)}/>
            </div>
        ]
    }

    const modalInputs = getEmployerModalInputs()
    const modalOnClick = () => saveEmployer(register, data, setData)
    return(
        <>
            <List labels={labels} sizing={sizing} template={template} data={data} cursor='pointer'/>
            <Modal title='Dodaj pracownika' inputs={modalInputs} onClick={modalOnClick} onCleaning={()=>dispatch(clearAllRegister())} validate={register.validation} setValidate={(validation)=>dispatch(setRegisterValidation(validation))}/>
            <div className='Right'>
                <Button icon={<Add fontSize='small'/>} text='Dodaj' onClick={() => openDialog()}/>
            </div>
        </>

    )
}