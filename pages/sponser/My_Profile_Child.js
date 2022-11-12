import React from "react";
import { useState } from "react";
const My_Profile_Child=(props)=>
{
    // let isVal=false;
    // let error=false;
    // let onHandle=(e)=>
    // {
    //     if(props.reg.test((e.target.value)))
    //     {
    //         // setError(true);
    //         error=true;
    //         isVal=true;
    //     }
    //     else
    //     {
    //         // setError(false);
    //         error=false;
    //         isVal=false;
    //     }
    //     props.handleChange(props.name,e.target.value,isVal,error);
    // }
    let onHandle=(e)=>
    {
        props.handleChange(props.name,e.target.value);
    }
    return(
        <div>
            <input type={props.type} name={props.name} value={props.value} className="form-control" onChange={onHandle}/>
            {/* {error ? <p style={{color:'green'}}>Valid {props.name}</p>:<p style={{color:'red'}}>InValid {props.name}</p>} */}
        </div>
    );
}
export default My_Profile_Child;