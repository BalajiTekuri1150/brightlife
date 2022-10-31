import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import { useState } from "react";
export default function(){
    const [err,setErr]=useState(false)
    const change=(e)=>{
        if(e.target.value!=""){
            setErr(false)
            props.onChange(e.target.name,e.target.value,false)
        }
        else{
            setErr(true)
            props.onChange(e.target.name,e.target.value,false)
        }

    }
    return(
        <>
            <input className="form-control" name={props.name} type={pros.type} onChange={change}/>
            {errmsg?<p className="text-danger">Enter valid data for{props.name}</p>:<p></p>}
        </>
    )
}