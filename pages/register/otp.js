import React from "react";
import {useState,useRef,useEffect} from "react";
import { useRouter } from 'next/router';
import style from '../../styles/register.module.css';
import Router from 'next/router';
import { setLocalData } from "../../utils/storage_service";
import { getLocalData } from "../../utils/storage_service";
import { postData1 } from "../../utils/data_manage_service";
const Otp=()=>
{
    const router = useRouter()
    const {name,email,pass,role}=router.query;
    const [num1,setNum1]=useState("");
    const [num2,setNum2]=useState("");
    const [num3,setNum3]=useState("");
    const [num4,setNum4]=useState("");
    const [res,setRes]=useState();
    const otp1Ref=useRef("")
    const otp2Ref=useRef("")
    const otp3Ref=useRef("")
    const otp4Ref=useRef("")
    const [message,setMessage]=useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [disable,setDisable]=useState(true);

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
        setDisable(false);
        setMessage("");
        if(e.target.name==="otp1")
        {
            otp2Ref.current.focus();
        }
        if(e.target.value==="")
        {
            if(e.target.name==="otp1")
            {
                otp1Ref.current.focus();
            }
        }
        setNum1(e.target.value);
    }
    const handleOTP2=(e)=>
    {
        setDisable(false);
        setMessage("");
        if(e.target.name==="otp2")
        {
            otp3Ref.current.focus();
            if(e.target.value==="")
            {
                otp1Ref.current.focus();
            }
        }
        // if(e.target.value==="")
        // {
        //     if(e.target.name==="otp2")
        //     {
        //         otp1Ref.current.focus();
        //     }
        // }
        setNum2(e.target.value);
    }
    const handleOTP3=(e)=>
    {
        setDisable(false);
        setMessage("");
        if(e.target.name==="otp3")
        {
            otp4Ref.current.focus();
        }
        if(e.target.value==="")
        {
            if(e.target.name==="otp3")
            {
                otp2Ref.current.focus();
            }
        }
        setNum3(e.target.value);
    }
    const handleOTP4=(e)=>
    {
        setDisable(false);
        setMessage("");
        if(e.target.value==="")
        {
            if(e.target.name==="otp4")
            {
                otp3Ref.current.focus();
            }
        }
        setNum4(e.target.value);
    }
    const resendOTP=async()=>
    {
        const refid=getLocalData("reference_id")
        const data ={
            referrence_id:refid
        } 
        const result=await(postData1('https://test-api.brightlife.org/brightlife/v2/resend/otp',data))
        if(result?.data?.status){         
            setMessage(result?.data?.response?.message)   
        }
        else{
            setMessage(result?.data?.error?.message)
        }        
        setTimeLeft(30)
    }
    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        const total=num1+num2+num3+num4;
        console.log(total);
        const data1={
            email:email,
            context:"signup",
            otp:total,
        }
        const result=await(postData1("https://test-api.brightlife.org/brightlife/v2/verify/otp",data1));
        if(result?.data?.status==true)
        {
            const data2={
                name:name,
                email:email,
                password:pass,
                password2:pass,
                role:role,
            }
            const result1=await(postData1("https://test-api.brightlife.org/brightlife/signup",data2))
            if(result1?.data?.status==true)
            {
                setLocalData("id",result1?.data?.response?.data?.id);
                Router.push({
                    pathname:'/sponser/sponser',
                    query:{name:name,email:email,pass:pass,id:result1?.data?.response?.data?.id}
                })
            }  
            else
                setMessage(result1?.data?.error);
        }
        else{
            setMessage(result?.data?.error?.message);
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
        //                 name:name,
        //                 email:email,
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
        //                     setLocalData("id",response?.response?.data?.id);
        //                     Router.push({
        //                         pathname:'/sponser/sponser',
        //                         query:{name:name,email:email,pass:pass,id:response?.response?.data?.id}
        //                     })
        //                 });
        //             })
        //         }
        //         else{
        //            setMessage(response?.error?.message);
        //         }
        //     });
        // })
    }
    return(
        <div>
            <form className={style.forming1}>
                <h2 style={{marginLeft:"100px"}}>Enter OTP</h2><hr/>
                <label style={{marginLeft:"30px"}}>You will get OTP to the registered gmail</label><br/><br/>
                <input type="text" onChange={handleOTP1} ref={otp1Ref} name="otp1" className={style.otpBox} required/>
                <input type="text" onChange={handleOTP2} ref={otp2Ref} name="otp2" className={style.otpBox} required/>
                <input type="text" onChange={handleOTP3} ref={otp3Ref} name="otp3" className={style.otpBox} required/>
                <input type="text" onChange={handleOTP4} ref={otp4Ref} name="otp4" className={style.otpBox} required/><br/><br/>
                <div style={{color:'red'}}>{message}</div>
                <button className='btn-success' 
                            style={{marginLeft:'80px',width:'180px',height:'40px',borderRadius:'5px',backgroundColor:'lightseagreen '}
                            }
                            onClick={handleSubmit}
                            disabled={disable}>
                            SUBMIT OTP
                </button><br/><br/>
                <div className="content d-flex justify-content-center mb-4"> Didn't received OTP?
                    {timeLeft==0?<p className="text-primary text-decoration-underline pe-auto" onClick={resendOTP}><a href="#">Resend OTP</a></p>:<p className="text-decoration-underline pe-none"> Resend OTP in {timeLeft}</p>} 
                </div>
            </form>
        </div>
    )
}
export default Otp;