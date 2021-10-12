import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
const Alert = ()=>{
    const {filterList,alert,setAlert} = useGlobalContext()
    useEffect(()=>{
        let timer;
        timer = setTimeout(()=>{
            console.log("hello")
            setAlert({sign:"",message:""})
        },3000)
        return ()=>clearTimeout(timer)
    },[filterList,alert.message])

    //added alert becuase when you try to submit a form without filling all the required field we change the alert stateValue and filterList is not changed at that time so therefore.
    
    return (
        <div className = "alert-container">
            <p className = {alert.sign}>{alert.message}</p>
        </div>
    )
}
export default Alert;