import React from "react";
import {useState,useRef} from "react";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import style from '../styles/register.module.css';
import Router from 'next/router';
import { setLocalData } from "../utils/Data_Manager";
import { postData } from "../utils/data_manage_service";
import { postData1 } from "../utils/data_manage_service";

const Otp=()=>
{
    const router = useRouter()
    const {name,email,pass,role,ref_id}=router.query;
    const [num1,setNum1]=useState("");
    const box1=useRef("");
    const [num2,setNum2]=useState("");
    const box2=useRef("");
    const [num3,setNum3]=useState("");
    const box3=useRef("");
    const [num4,setNum4]=useState("");
    const box4=useRef("");
    const [res,setRes]=useState();
    const [id,setId]=useState("1");
    const [disable,setDisable]=useState(true);
    const [message,setMessage]=useState(true)
    const [ele1,setEle1]=useState("");
    const [status,setStatus]=useState("")
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if(timeLeft!=0){
        const interval = setInterval(() => {
          setTimeLeft((prevtimeLeft) => prevtimeLeft-1);
        }, 1000);
        return () => clearInterval(interval);
    }
      }, [timeLeft]);
      
    const handleOTP1=(e)=>
    {
        setEle1("");
        setDisable(false);
        setNum1(e.target.value);
        if(e.target.name==="box1")
        {
            box2.current.focus();
        }
    }
    const handleOTP2=(e)=>
    {
        setEle1("");
        setDisable(false)
        setNum2(e.target.value);
        if(e.target.name==="box2")
        {
            box3.current.focus();
        }
    }
    const handleOTP3=(e)=>
    {
        setEle1("");
        setDisable(false)
        setNum3(e.target.value);
        if(e.target.name==="box3")
        {
            box4.current.focus();
        }
    }
    const handleOTP4=(e)=>
    {
        setEle1("");
        setDisable(false)
        setNum4(e.target.value);
    }
    const resendOTP=async()=>
    {
        const data ={
            referrence_id:ref_id
        } 
        const result=await(postData('https://test-api.brightlife.org/brightlife/v2/resend/otp',data))
        setStatus(result.data.status)
        if(result?.data?.status){         
            setMessage(result?.data?.response?.message)    
        }
        else{
            setMessage(result?.data?.error?.message)
        }        
    }
    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        setDisable(true);
        const total=num1+num2+num3+num4;
        console.log(total);
        const data1={
            email:email,
            context:"signup",
            otp:total,
        }
        const response=await(postData1('https://test-api.brightlife.org/brightlife/v2/verify/otp',data1));
        console.log(response?.status);
        if(response?.data?.status==true)
        {
            const data2={
                email:email,
                name:name,
                password:pass,
                password2:pass,
                role:role,
            }
            const result=await(postData1('https://test-api.brightlife.org/brightlife/signup',data2));
            if(role=="sponsor")
            {
                console.log(result?.data?.status);
                if(result?.data?.status==true)
                {
                    console.log(result?.data?.response?.data.id);
                    setId(result?.data?.response?.data.id);
                    console.log(id);
                    Router.push({
                        pathname:'/Sponser',
                        query: {name:name,email:email,pass:pass,role:role,id:result?.data?.response?.data?.id},
                    })
                }
                else
                {
                    console.log(result?.data?.response?.error);
                    setEle1("User already Exists");
                }
            }
            else
            {
                console.log("You selected Other than sponsor");
            }
        }
        else
        {
            setEle1(response?.data?.error?.message)
        }
        // const JSONdata=JSON.stringify(data1);
        // fetch("https://test-api.brightlife.org/brightlife/v2/verify/otp",{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json',
        //     },
        //     body:JSONdata,
        // })
        // .then((response)=>{
        //     console.log(response);
        //     response.json()
        //     .then((response)=>{
        //         console.log(response.status);
        //        if(response.status==true)
        //         {
                    
        //             const data2={
        //                 email:email,
        //                 name:name,
        //                 password:pass,
        //                 password2:pass,
        //                 role:role,
        //             }
        //             const JSONdata2=JSON.stringify(data2);
        //             fetch("https://test-api.brightlife.org/brightlife/signup",{
        //                 method:'POST',
        //                 headers:{
        //                     'Content-Type':'application/json',
        //                 },
        //                 body:JSONdata2,
        //             })
        //             .then((response)=>{
        //                 response.json()
        //                 .then((response)=>{
        //                     if(role=="sponsor")
        //                     {
        //                         //console.log(response.status);
        //                         if(response.status==true)
        //                         {
        //                             console.log(response.response.data.id);
        //                             setId(response.response.data.id);
        //                             console.log(id);
        //                             Router.push({
        //                                 pathname:'/Sponser',
        //                                 query: {name:name,email:email,pass:pass,role:role,id:response.response.data.id},
        //                             })
        //                         }
        //                         else
        //                         {
        //                             console.log("User Already Exists");
        //                             setRes(response.error);
        //                         }
        //                     }
        //                     else    
        //                     {
        //                         alert("You selected the role other than Sponser");
        //                     }
        //                 });
        //             })
        //         }
        //         else{

        //             setRes(response.error.message);
        //         }
        //     });
        // })
    }
    return(
        <div>
            <form className={style.forming1}>
                <h2 style={{marginLeft:"100px"}}>Enter OTP</h2><hr/>
                <label style={{marginLeft:"30px"}}>You will get OTP to the registered gmail</label><br/><br/>
                <input type="text" onChange={handleOTP1} ref={box1} name="box1" className={style.otpBox} maxLength={1}/>
                <input type="text" onChange={handleOTP2} ref={box2} name="box2" className={style.otpBox} maxLength={1}/>
                <input type="text" onChange={handleOTP3} ref={box3} name="box3" className={style.otpBox} maxLength={1}/>
                <input type="text" onChange={handleOTP4} ref={box4} name="box4" className={style.otpBox} maxLength={1}/><br/><br/>
                <label style={{color:'red',marginLeft:'80px'}}>{res}</label><br/><br/>
                {status ? <p className="text-success">{message}</p>:<p className="text-danger">{message}</p>}
                <div style={{color:"red"}}>{ele1}</div>
                <button className='btn-success' 
                            style={{marginLeft:'80px',width:'180px',height:'40px',borderRadius:'5px',backgroundColor:'lightseagreen '}
                            }
                            onClick={handleSubmit}
                            disabled={disable}
                            >
                            SUBMIT OTP
                </button><br/><br/>
                {/* <button onClick={handleResend}>Resend OTP</button> */}
                <div className="content d-flex justify-content-center mb-4"> Didn't received OTP?
                    {timeLeft==0?<p className="text-primary text-decoration-underline pe-auto" onClick={resendOTP}><a href="#">Resend OTP</a></p>:<p className="text-decoration-underline pe-none"> Resend OTP in {timeLeft}</p>} 
                </div>
            </form>
        </div>
    )
}
export default Otp;