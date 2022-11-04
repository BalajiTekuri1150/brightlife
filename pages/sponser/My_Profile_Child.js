import React from "react";
const My_Profile_Child=(props)=>
{
    let onHandle=(e)=>
    {
        props.handleChange(props.name,e.target.value);
    }
    return(
        <div>
            <input type={props.type} name={props.name} value={props.value} className="form-control" onChange={onHandle}/>
        </div>
    );
}
export default My_Profile_Child;