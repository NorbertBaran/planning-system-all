import {del, post} from "../../../api/RestApi";
import Input from "../../../components/Input/Input";
import {Search} from "@material-ui/icons";

export const getMaterialModalInputs = (addMaterial, setCategory, setName, setSupplier, setCount, setMeasure) => {
    return [
        <Input background='white' placeholder='Kategoria' inputState={addMaterial.category} setInputState={setCategory}/>,
        <Input background='white' placeholder='Nazwa' inputState={addMaterial.name} setInputState={setName}/>,
        <Input background='white' placeholder='Dostawca' inputState={addMaterial.supplier} setInputState={setSupplier}/>,
        <Input background='white' placeholder='Ilość' inputState={addMaterial.count} setInputState={setCount}/>,
        <Input background='white' placeholder='Jednostka miary' inputState={addMaterial.measure} setInputState={setMeasure}/>
    ]
}

export const saveMaterial = (addMaterial, data, setData) => {
    const postMethod = async () => {
        try {
            const dto = {
                category: addMaterial.category,
                name: addMaterial.name,
                supplier: addMaterial.supplier,
                count: addMaterial.count,
                measure: addMaterial.measure,
                notExpired: true
            }
            const tool = await post('http://localhost:8080/api/materials', dto, sessionStorage.getItem("JWT"))
            setData([...data, tool])
        }catch (exception){
            alert("Niepoprawne dane")
        }
    }
    if(addMaterial.validation === false)
        alert("Wszystkie pola są obowiązkowe")
    else
        postMethod()
}

export const deleteMaterial = (id, data, setData) => {
    const deleteToolAsync = async () => {
        try {
            await del('http://localhost:8080/api/materials/'+id, sessionStorage.getItem('JWT'))
            setData(data.filter((team) => team.id !== id))
        }catch (exception){}
    }
    deleteToolAsync()
}