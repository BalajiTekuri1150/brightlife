import React from "react";
import {useState} from "react";
import { useRouter } from 'next/router';
import style from '../styles/register.module.css';
import Router from 'next/router';
const Otp=()=>
{
    const router = useRouter()
    const {name,email,pass,role}=router.query;
    const [num1,setNum1]=useState("");
    const [num2,setNum2]=useState("");
    const [num3,setNum3]=useState("");
    const [num4,setNum4]=useState("");
    const [res,setRes]=useState();
    const handleOTP1=(e)=>
    {
        setNum1(e.target.value);
    }
    const handleOTP2=(e)=>
    {
        setNum2(e.target.value);
    }
    const handleOTP3=(e)=>
    {
        setNum3(e.target.value);
    }
    const handleOTP4=(e)=>
    {
        setNum4(e.target.value);
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const total=num1+num2+num3+num4;
        console.log(total);
        const data1={
            email:email,
            context:"signup",
            otp:total,
        }
        const JSONdata=JSON.stringify(data1);
        fetch("https://test-api.brightlife.org/brightlife/v2/verify/otp",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSONdata,
        })
        .then((response)=>{
            console.log(response);
            response.json()
            .then((response)=>{
                console.log(response.status);
               if(response.status==true)
                {
                    
                    const data2={
                        name:name,
                        email:email,
                        password:pass,
                        password2:pass,
                        role:role,
                    }
                    const JSONdata2=JSON.stringify(data2);
                    fetch("https://test-api.brightlife.org/brightlife/signup",{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSONdata2,
                    })
                    .then((response)=>{
                        response.json()
                        .then((response)=>{
                            alert("valid otp and User Registered Successfully");
                            Router.push({
                                pathname:'/Final',

                            })
                        });
                    })
                }
                else{
                    alert("Invalid Otp or Expired");
                }
            });
        })
    }
    return(
        <div>
            <form className={style.forming1}>
                <h2 style={{marginLeft:"100px"}}>Enter OTP</h2><hr/>
                <label style={{marginLeft:"30px"}}>You will get OTP to the registered gmail</label><br/><br/>
                <input type="number" onChange={handleOTP1} className={style.otpBox} required/>
                <input type="number" onChange={handleOTP2} className={style.otpBox} required/>
                <input type="number" onChange={handleOTP3} className={style.otpBox} required/>
                <input type="number" onChange={handleOTP4} className={style.otpBox} required/><br/><br/>
                <button className='btn-success' 
                            style={{marginLeft:'80px',width:'180px',height:'40px',borderRadius:'5px',backgroundColor:'lightseagreen '}
                            }
                            onClick={handleSubmit}>
                            SUBMIT OTP
                </button><br/><br/>
            </form>
        </div>
    )
}
export default Otp;