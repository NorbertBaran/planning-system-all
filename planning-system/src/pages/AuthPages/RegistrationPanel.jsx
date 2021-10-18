import Input from "../../components/Input/Input";
import {ArrowBack, ArrowForward, LockOpen, Person, Security} from "@material-ui/icons";
import styles from "./AuthPages.module.css";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import {postRegistrationData} from "../../api/AuthApi";
import {useHistory} from "react-router-dom";
import {postEmployer} from "../../api/EmployersApi";
import {
    clearAllRegister,
    setRegisterAge,
    setRegisterCity,
    setRegisterCityCode,
    setRegisterCompanyName,
    setRegisterLastName,
    setRegisterName,
    setRegisterPassword,
    setRegisterPasswordRepeat,
    setRegisterPessel,
    setRegisterPhone,
    setRegisterPosition,
    setRegisterRole,
    setRegisterSalary,
    setRegisterStep,
    setRegisterStreet,
    setRegisterUsername,
    setRegisterValidation
} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const UserBasics = ({type}) => {
    const register = useSelector(state => state.register)
    const dispatch = useDispatch();
    return(
        <div className={styles.Inputs}>
            <Input placeholder="Nazwa użytkownika" inputState={register.username} setInputState={(username)=>dispatch(setRegisterUsername(username))}/>
            <Input type="password" placeholder="Hasło" inputState={register.password} setInputState={(password)=>dispatch(setRegisterPassword(password))}/>
            <Input type="password" placeholder="Powtórz hasło" inputState={register.passwordRepeat} setInputState={(passwordRepeat)=>dispatch(setRegisterPasswordRepeat(passwordRepeat))}/>
            <div className={type === 'create' ? styles.SubmitCreate : styles.SubmitAdd}>
                <Button icon={<ArrowForward fontSize='small'/>} text='Krok 2' onClick={()=>{register.password===register.passwordRepeat ? dispatch(setRegisterStep(2)) : alert('Nieprawidłowo powtórzone hadło')}}/>
            </div>
        </div>
    )
}

const UserDetails = ({type}) => {
    const register = useSelector(state => state.register)
    const dispatch = useDispatch();
    return(
        <div className={styles.Inputs}>
            <Input placeholder="Imię" icon={<Person/>} inputState={register.name} setInputState={(name)=>dispatch(setRegisterName(name))}/>
            <Input placeholder="Nazwisko" icon={<Person/>} inputState={register.lastName} setInputState={(lastName)=>dispatch(setRegisterLastName(lastName))}/>
            <Input placeholder="Wiek (liczba całkowita)" icon={<Person/>} inputState={register.age} setInputState={(age)=>dispatch(setRegisterAge(age))}/>
            <Input placeholder="Pesel" icon={<Person/>} inputState={register.pessel} setInputState={(pessel)=>dispatch(setRegisterPessel(pessel))}/>
            <div className={type === 'create' ? styles.SubmitCreate : styles.SubmitAdd}>
                <Button icon={<ArrowBack fontSize='small'/>} text='Krok 1' onClick={()=>dispatch(setRegisterStep(1))}/>
                <Button icon={<ArrowForward fontSize='small'/>} text='Krok 3' onClick={()=>dispatch(setRegisterStep(3))}/>
            </div>
        </div>
    )
}

const UserContact = ({type}) => {
    const register = useSelector(state => state.register)
    const dispatch = useDispatch();
    return(
        <div className={styles.Inputs}>
            <Input placeholder="Ulica" icon={<Person/>} inputState={register.street} setInputState={(street)=>dispatch(setRegisterStreet(street))}/>
            <Input placeholder="Miejscowość" icon={<Person/>} inputState={register.city} setInputState={(city)=>dispatch(setRegisterCity(city))}/>
            <Input placeholder="Kod pocztowy" icon={<Person/>} inputState={register.cityCode} setInputState={(cityCode)=>dispatch(setRegisterCityCode(cityCode))}/>
            <Input placeholder="Telefon" icon={<Person/>} inputState={register.phone} setInputState={(phone)=>dispatch(setRegisterPhone(phone))}/>
            <div className={type === 'create' ? styles.SubmitCreate : styles.SubmitAdd}>
                <Button icon={<ArrowBack fontSize='small'/>} text='Krok 2' onClick={()=>dispatch(setRegisterStep(2))}/>
                <Button icon={<ArrowForward fontSize='small'/>} text='Krok 4' onClick={()=>dispatch(setRegisterStep(4))}/>
            </div>
        </div>
    )
}

const CompanyGenerator = ({type, summit}) => {
    const register = useSelector(state => state.register)
    const dispatch = useDispatch();
    return(
        <div className={styles.Inputs}>
            <Input placeholder="Nazwa firmy" icon={<Person/>} inputState={register.companyName} setInputState={(companyName)=>dispatch(setRegisterCompanyName(companyName))}/>
            <Input placeholder="Pozycja(prezes, kierownik, etc.)" icon={<Person/>} inputState={register.position} setInputState={(position)=>dispatch(setRegisterPosition(position))}/>
            <Input placeholder="Wynagrodzenie (liczba całkowita)" icon={<Person/>} inputState={register.salary} setInputState={(salary)=>dispatch(setRegisterSalary(salary))}/>
            <div className={type === 'create' ? styles.SubmitCreate : styles.SubmitAdd}>
                <Button icon={<ArrowBack fontSize='small'/>} text='Krok 3' onClick={()=>dispatch(setRegisterStep(3))}/>
                <Button icon={<LockOpen fontSize='small'/>} text='Zarejestruj' onClick={()=>{summit()}}/>
            </div>
        </div>
    )
}

const CompanyAdder = ({type}) => {
    const register = useSelector(state => state.register)
    const dispatch = useDispatch();
    return(
        <div className={styles.Inputs}>
            <Input placeholder="Rola(Admin/User)" icon={<Person/>} inputState={register.role} setInputState={(role)=>dispatch(setRegisterRole(role))}/>
            <Input placeholder="Pozycja(prezes, kierownik, etc.)" icon={<Person/>} inputState={register.position} setInputState={(position)=>dispatch(setRegisterPosition(position))}/>
            <Input placeholder="Wynagrodzenie" icon={<Person/>} inputState={register.salary} setInputState={(salary)=>dispatch(setRegisterSalary(salary))}/>
            <div className={type === 'create' ? styles.SubmitCreate : styles.SubmitAdd}>
                <Button icon={<ArrowBack fontSize='small'/>} text='Krok 3' onClick={()=>dispatch(setRegisterStep(3))}/>
            </div>
        </div>
    )
}

const RegistrationPanel = ({type='create'}) => {

    const register = useSelector(state => state.register)
    const dispatch = useDispatch();
    const history = useHistory();

    const cleaning = () => {
        clearAllRegister()
    }

    const registration = () => {
        const registrationAsync = async () => {
            try {
                if(register.password === register.passwordRepeat){
                    if(type==='create'){
                        await postRegistrationData(register)
                        alert("Firma "+register.companyName+" została zarejestrowania.")
                        history.push("/admin/employers");
                        dispatch(clearAllRegister())
                    } else {
                        alert("Rejestracja...")
                        const employer = await postEmployer(register.username, register.name, register.lastName, register.age, register.pessel, register.street, register.cityCode, register.city, register.phone, register.position, register.salary, register.password, register.role, sessionStorage.getItem("JWT"))
                        //setEmployersData([...employersData, employer])
                        alert("Dodano nowego użytkownika.")
                    }
                }
            }catch (exception){

            }
        }
        registrationAsync()
    }

    const summit = () => {
        if(register.validation === false)
            alert("Wszystkie pola są obowiązkowe")
        else
            registration()
    }

    useEffect(()=>{
        //setCleaningCallback(()=>cleaning)
        //setSummitCallback(()=>summit)
        if(register.username === "" || register.password === "" ||
            register.name === "" || register.lastName === "" || register.age === "" || register.pessel === "" ||
            register.street === "" || register.city === "" || register.cityCode === "" || register.phone === "" ||
            (type === 'create' && register.companyName === "") || (type !== 'create' && register.role === "") || register.position === "" || register.salary === ""){
            dispatch(setRegisterValidation(false))
        } else {
            dispatch(setRegisterValidation(true))
        }
    },[register.username, register.password, register.passwordRepeat, register.name, register.lastName, register.age, register.pessel, register.street, register.city, register.cityCode, register.phone, register.companyName, register.role, register.position, register.salary, register.validation])

    if(register.step===1)
        return (<UserBasics type={type}/>)
    else if(register.step===2)
        return (<UserDetails type={type}/>)
    else if(register.step===3)
        return (<UserContact type={type}/>)
    else
        return type === 'create' ?
            (<CompanyGenerator summit={summit} type={type}/>) :
            (<CompanyAdder summit={summit} type={type}/>)
}

export default RegistrationPanel