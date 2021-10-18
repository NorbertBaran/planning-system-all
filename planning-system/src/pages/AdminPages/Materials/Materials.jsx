import styles from '../MenuPages.module.css'
import {MaterialsList} from "./List";
import {useEffect} from "react";
import {setMaterialValidation, setToolValidation} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const Materials = ({data, setData}) => {
    const addMaterial= useSelector(state => state.addMaterial)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(addMaterial.category === '' || addMaterial.name === '' || addMaterial.supplier === '' || addMaterial.count === '' || addMaterial.measure === '')
            dispatch(setMaterialValidation(false))
        else
            dispatch(setMaterialValidation(true))
        //getEmployerByUsername(addTeamEmployer.username, (id)=>dispatch(setTeamEmployerId(id)))
    }, [addMaterial.category, addMaterial.name, addMaterial.supplier, addMaterial.count, addMaterial.measure])

    return(
        <div className={styles.MenuPages}>
            {/*<List labels={labels} sizing={sizing} template={template} data={data}/>*/}
            <MaterialsList data={data} setData={setData}/>
        </div>
    )
}

export default Materials