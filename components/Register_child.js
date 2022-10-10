import React from 'react';
import {useState} from 'react';
const Register_child=(props)=>
{
    let isVal=false;
    let [error,setError]=useState(false);
    let onHandle=(e)=>
    {
        if(props.reg.test((e.target.value)))
        {
            setError(true);
            isVal=true;
        }
        else
        {
            setError(false);
            isVal=false;
        }
        props.handleChange(props.name,e.target.value,isVal);
    }
    return(
        <div>
            <input type={props.type} value={props.value} name={props.name} onChange={onHandle} className="form-control" />
            {error ? <p style={{color:'green'}}>Valid {props.name}</p>:<p style={{color:'red'}}>InValid {props.name}</p>}
        </div>
    );
}
export default Register_child;