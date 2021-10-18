import styles from '../MenuPages.module.css'
import List from "../../../components/List/List";
import Text from "../../../components/Text/Text";
import DoubleLineText from "../../../components/DoubleLineText/DoubleLineText";
import {ToolsList} from "./List";
import {useEffect} from "react";
import {setTeamEmployerValidation, setTeamValidation, setToolValidation} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const Tools = ({data, setData}) => {
    const addTool= useSelector(state => state.addTool)
    const dispatch = useDispatch();
    /*const labels = ['Nr', 'Kategoria', 'Nazwa', 'Model/Nr seryjny', 'Data zakupu', 'Cena netto/brutto']
    const sizing = '0.2fr 1fr 1fr 1fr 1fr 1fr'
    const template = (nr, rowData) => {
        return [
            <Text content={nr} variant='bold'/>,
            <Text content={rowData.category}/>,
            <Text content={rowData.name}/>,
            <DoubleLineText firstLine={rowData.model} secondLine={rowData.identityNo}/>,
            <Text content={rowData.buyDate}/>,
            <DoubleLineText firstLine={rowData.price+' PLN'} secondLine={1.23*rowData.price+' PLN'}/>,
        ]
    }
    const data = [{
        category: 'Spawarki',
        name: 'Spawarka migowa',
        model: 'XFC-120-17-0-1KF',
        identityNo: 'AKW-11-42-75-722-UL',
        buyDate: '20.05.2015',
        price: 1599
    },{
        category: 'Spawarki',
        name: 'Spawarka',
        model: 'XFC-120-17-0-1KF',
        identityNo: 'AKW-11-42-75-722-UL',
        buyDate: '20.05.2015',
        price: 1599
    }]*/
    useEffect(()=>{
        if(addTool.category === '' || addTool.name === '' || addTool.model === '' || addTool.identityNo === '')
            dispatch(setToolValidation(false))
        else
            dispatch(setToolValidation(true))
        //getEmployerByUsername(addTeamEmployer.username, (id)=>dispatch(setTeamEmployerId(id)))
    }, [addTool.category, addTool.name, addTool.model, addTool.identityNo])

    return(
        <div className={styles.MenuPages}>
            <ToolsList data={data} setData={setData}/>
        </div>
    )
}

export default Tools