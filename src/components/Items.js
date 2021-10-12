import React from "react";
import Item from "./Item"
import { useGlobalContext } from "./context"
const Items = ()=>{
    const {filterList,handleClear,isEdit} = useGlobalContext()
    return (
        <React.Fragment>
            <section className = "items-container">
                {filterList.map((item)=><Item key = {item.id} {...item}/>)}
            </section>
            <button 
            style = {{opacity: isEdit ? "0.3" : "1"}} 
            className = "clear" 
            onClick = {handleClear} 
            disabled = {isEdit ? true : false}>Clear List</button>
        </React.Fragment>
    )   
}
export default Items;