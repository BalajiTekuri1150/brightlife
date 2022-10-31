import { useState } from "react";
export default function Input(props){
    const [err,setErr]=useState(false)
    const [msg,setMsg]=useState("")
    const change=(e)=>{
        if(e.target.name=="mobile"){
            if(e.target.value.length!=10){
                setErr(true)
                setMsg("Phone number must cntain 10 digits")
                props.onChange(e.target.name,e.target.value,false)
            }
            else{
                setErr(false)
                setMsg("")
                props.onChange(e.target.name,e.target.value,true)
            }
        }
        else if(e.target.name=="username"){
            if(( /^[a-zA-Z0-9]+$/).test(e.target.value)){
                setErr(false)
                setMsg("")
                props.onChange(e.target.name,e.target.value,true)
            }
            else{
                setErr(true)
                setMsg("Enter valid Username without specal characters")
                props.onChange(e.target.name,e.target.value,false)
            }
        }
        else if(e.target.name=="email"){
            if((/\S+@\S+\.\S+/).test(e.target.value))
            {
                setErr(false)
                setMsg("")
                props.onChange(e.target.name,e.target.value,true)
            }
            else{
                setErr(true)
                setMsg("Enter valid email")
                props.onChange(e.target.name,e.target.value,false)
            }
        }
        else{
            if(e.target.value==""){
                setErr(true)
                setMsg(e.target.name+" must not be empty")
                props.onChange(e.target.name,e.target.value,false)
            }
            else{
                setErr(false)
                setMsg("")
                props.onChange(e.target.name,e.target.value,true)
            }
        }

    }
    return(
        <>
            <input className="form-control" name={props.name} type={props.type} onChange={change}/>
            {err?<p className="text-danger">{msg}</p>:<p></p>}
        </>
    )
}