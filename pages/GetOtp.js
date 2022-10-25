import React from "react";
import style from '../styles/register.module.css';
import Router from 'next/router';
import { useState } from 'react';
import { useRouter } from 'next/router';
const GetOtp=()=>
{
    const router = useRouter()
    const{name,gmail,pass,role}=router.query;
    const handleOtp=(e)=>
    {
        e.preventDefault();
        const data={
            email:gmail,
            context:"signup"
        }
        const JSONdata=JSON.stringify(data);
        fetch("https://test-api.brightlife.org/brightlife/v2/get/otp",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSONdata,
        })
        .then((response)=>{
                response.json()
                .then((response)=>{
                    console.log(response.status)
                    if(response.status==true){
                        //console.log(gmail)
                        //console.log(data.email)
                        Router.push({
                            pathname: '/Otp',
                            query: {name:name,email:gmail,pass:pass,role:role},
                        });
                    }
                    else{
                        alert("User Already Exists");
                    }
                })
        })
    }
    return(
        <div>
            <form className={style.forming1}>
                <h2 style={{marginLeft:"70px"}}>Gmail Confirmation</h2><hr/>
                <label style={{marginLeft:"30px"}}>You will get OTP to the registered gmail</label><br/><br/>
                <button className='btn-success' 
                            style={{marginLeft:'80px',width:'180px',height:'40px',borderRadius:'5px',backgroundColor:'lightseagreen '}
                            }
                            onClick={handleOtp}>
                            GET OTP
                </button><br/><br/>
            </form>
        </div>
    );
}
export default GetOtp;