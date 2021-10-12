import React, { useRef,useState, useEffect } from "react"
import { useGlobalContext } from "./context"
const Navbar = ()=>{
    const {list,handleSelectChange,filterList} = useGlobalContext()
    const [scrollValue,setScrollValue] = useState(0)
    const value = useRef(0)
    const showScrollResult = ()=>{
        setScrollValue(window.scrollY)
    } 
    useEffect(()=>{
        if(scrollValue > 70)
        {
            value.current.style.boxShadow = "2px 2px 5px grey"
        }
        else
        {
           
            value.current.style.boxShadow = ""
        }
    },[scrollValue])
    window.addEventListener("scroll",showScrollResult)

    return (
       <header ref = {value}>
           <h1>Priority Todo</h1>
           <article>
               <div className = "check">
                   <select  onChange = {handleSelectChange} disabled = {list.length > 0 ? false : true}>
                       <option value = "all_checked_unchecked">All</option>
                       <option value = "checked">Checked</option>
                       <option value = "unchecked">UnChecked</option>
                   </select>
               </div>
               <div className = "priority">
                   <select onChange = {handleSelectChange} disabled = {list.length > 0 ? false : true}>
                       <option value = "all_high_low">All</option>
                       <option value = "high">High Priority</option>
                       <option value = "low">Low Priority</option>
                   </select>
               </div>
           </article>
       </header>
    )
}
export default Navbar;