import React from "react"
import { FaEdit ,FaTrashAlt, FaCheck , FaStar} from "react-icons/fa"
import { useGlobalContext } from "./context"
const Item = ({name,id,value,completed})=>{
    const {handleCheck,handleDelete,handleEdit,isEdit} = useGlobalContext()
    return (
        <article className = "item-container" key = {id}>
            <div className = "name-container">
                <h1 style = {{opacity: completed ? "0.5" : "1",textDecoration : completed ? "line-through" : ""}}>{name.toUpperCase()}</h1>
            </div>
            <div className = "btn-container">
                <button 
                style = {{opacity : isEdit ? "0.3" : "1"}}  
                onClick = {()=>handleCheck(id)} 
                disabled = {isEdit ? true : false}><FaCheck/></button>
                <button 
                style = {{opacity : isEdit ? "0.3" : "1"}} 
                onClick = {()=>handleEdit(id)} 
                disabled = {isEdit ? true : false}><FaEdit/></button>
                <button 
                style = {{opacity : isEdit ? "0.3" : "1"}}
                onClick = {()=>handleDelete(id)} 
                disabled = {isEdit ? true : false}><FaTrashAlt/></button>
                <p>{value === "high" ? <FaStar/> : <FaStar className = "non-priority"/>}</p>
            </div>
        </article>
    )
}
export default Item;