import React from "react"
import Navbar from "./components/Navbar"
import Alert from "./components/Alert"
import Form from "./components/Form"
import Items from "./components/Items"
import "./App.css"
const App = ()=>{
  return (
   <main>
      <Navbar/>
      <section className = "container">
        <Alert/>
        <Form/>
        <Items/>
      </section>
   </main>
  )
}
export default  App;