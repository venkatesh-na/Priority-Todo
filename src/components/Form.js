import React from "react"
import {useGlobalContext} from "./context"
import {FaPlus} from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
const Form = ()=>{
    const {name,isEdit,radioValue,handleChange,handleSubmit,handleInputText} = useGlobalContext()
    return (
        <section className = "form-container">
            <div className = "div-form">
                <form>
                    <input type = "text" placeholder = "eg. milk" value = {name.toUpperCase()} onChange = {handleInputText}/>
                    <div className = "radio-container">
                        <label className = "high-radio">
                            High Priority
                            <input 
                            type = "radio" 
                            name = "radio" 
                            value = "high"
                            onChange = {handleChange}
                            checked = {radioValue === "high"}/>
                        </label>
                        <label className = "low-radio">
                            Low Priority
                            <input 
                            type = "radio" 
                            name = "radio"
                            value = "low" 
                            onChange = {handleChange}
                            checked = {radioValue === "low"}/>
                        </label>
                    </div>
                    <button type = "submit" onClick = {handleSubmit}>{isEdit ? <FaEdit/> : <FaPlus/>}</button>
                </form>
            </div>
        </section>
    )
}
export default Form