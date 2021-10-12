import React ,{ useContext, useEffect, useState } from "react"
const AppContext = React.createContext()

//retrieving data from localStorage
const getLocalData = ()=>{
    if(localStorage.getItem("todo") !== null)
    {
        return JSON.parse(localStorage.getItem("todo"))
    }
    else
    {
        return []
    }
}
const AppProvider = ({children})=>{
    const [list,setList] = useState(getLocalData())//primary list
    const [filterList,setFilterList] = useState(getLocalData())
    //to show filtered list without making chnages from primary list
    const [name,setName] = useState("")
    const [radioValue,setRadioValue] = useState("")
    const [isEdit,setIsEdit] = useState(false)
    const [editId,setEditId] = useState(null)
    const [alert,setAlert] = useState({sign:"",message:""})

    //if there is list present in localStorage, than we have to store that in setFilterList other wise it would be empty
    useEffect(()=>{
        setFilterList(list)
    },[list])

    //Radio
    const handleChange = (event)=>{
        setRadioValue(event.target.value)
    }

    const handleInputText = (e)=>{
        setName(e.target.value.toUpperCase())
    }
    //Submit
    const handleSubmit = (event)=>{
        event.preventDefault()
        if(filterList.find((item)=>item.name == name))
        {
            setAlert({sign:"danger",message:"item already exist in an list"})
        }
        else
        {
            if(name !== "" && radioValue !== "" && alert.message === "")
            {
                if(isEdit)
                {
                    //submit after edit
                    setList(list.map((item)=>{
                        if(item.id === editId)
                        {
                            console.log("connected")
                            return {"name":name,id:item.id,value:radioValue,completed:item.completed}
                        }
                        return item;
                    }))
                    setRadioValue("")
                    setName("")
                    setIsEdit(false)
                    setEditId(null)
                    setAlert({sign:"success",message:"one item is edited successfully"})
                }
                else
                {
                    setRadioValue("")
                    setName("")
                    setList([...list,{name:name,id:Math.random()*100,value:radioValue,completed:false}])
                    setAlert({sign:"success",message:"one item is added to the List"})
                }
            }
            else
            {
                setAlert({sign:"danger",message:"please fill all the required fields"})
            }
        }
    }

    //to show the chcked todo
    const handleCheck = (id)=>{
        setList(list.map((item)=>{
            if(item.id === id)
            {
                return {name:item.name,id:item.id,value:item.value,completed:!item.completed}
            }
            return item;
        }))
    }

    //Delete
    const handleDelete = (id)=>{
       setList(list.filter(item => item.id !== id))
       setAlert({sign:"danger",message:"one item is deleted from the List"})
    }

    //Edit
    const handleEdit = (id)=>{
        setIsEdit(true)
        setEditId(id)
        setList(list.map((item)=>{
            if(item.id === id)
            {
                setName(item.name)
                setRadioValue(item.value)
            }
            return item;
        }))
    }

    //Clear
    const handleClear = ()=>{
        setList([])
        setAlert({sign:"danger",message:"All item is remover from the List"})
    }

    //Filteration from select
    const handleSelectChange = (e)=>{
        console.log(e.target.value)
        switch(e.target.value)
        {
            case "all_checked_unchecked":
                setFilterList(list)
                break;
            case "checked":
                setFilterList(list.filter(item=>item.completed === true))
                 break;
            case "unchecked":
                setFilterList(list.filter(item=>item.completed !== true))
                 break;
            case "all_high_low":
                setFilterList(list)
                 break;
            case "high":
                setFilterList(list.filter(item=>item.value === "high"))
                 break;
            case "low":
                setFilterList(list.filter(item=>item.value === "low"))
                 break;
            default:
                setFilterList(list)
                 break;
        }
    }

    //save the changes in localStorage
    useEffect(()=>{
        localStorage.setItem("todo",JSON.stringify(filterList))
    },[filterList])
   return (
       <AppContext.Provider value = {{
           list,
           setList,
           filterList,
           name,
           setName,
           handleInputText,
           handleSelectChange,
           handleChange,
           handleSubmit,
           handleEdit,
           handleCheck,
           handleDelete,
           handleClear,
           radioValue,
           isEdit,
           alert,
           setAlert
           }}>
          {children}
       </AppContext.Provider>
   )
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext };