import React from "react";
import Router from 'next/router';
import { useState } from 'react';
import { useRouter } from 'next/router';
const Final=()=>
{
    const router = useRouter()
    const{name,gmail,pass,role}=router.query;
    const handleRegister=(e)=>
    {
        

    }
    return( 
        <div className="container">
            <h2>We need to add the Registration Person Details In this Page</h2>
            {/* <button className="btn btn-success" onClick={handleRegister}>Confirm</button> */}
        </div>
    )
}
export default Final;