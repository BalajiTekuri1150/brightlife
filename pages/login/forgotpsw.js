import {AiOutlineMail} from "react-icons/ai";
import {useRouter} from "next/router";
import { useState } from "react";
import { postData } from "../../utils/data_manage_service";
import { setLocalData } from "../../utils/storage_service";
import Head from "next/head";
import Script from "next/script";
export default function Forgotpsw()
{
    const router = useRouter();
    const [status,setStatus]=useState(true)
    const [message,setMessage]=useState("")
    const [disable,setDisable]=useState(false)
    const handleSubmit=async(e)=>
    {
        e.preventDefault()
        setDisable(true)
        if(e.target.email.value==""){
            setStatus(false)
            setMessage("Email must be required")  
            setDisable(false) 
        }
        else{
            const data = {
                email: e.target.email.value,
                context:"forgot_password"
            }
            const result=await(postData('https://test-api.brightlife.org/brightlife/v2/get/otp',data,0))
            setStatus(result?.data?.status)
            if(result?.data?.status){
                setMessage(result?.data?.response?.message) 
                setLocalData("email",e.target.email.value)
                setLocalData("refid",result.data.response.referrence_id)
                router.push({ 
                    pathname: '/login/enterotp',
                    query: { context:data.context}
                })
            }
            else{
                setMessage(result?.data?.error.message)  
                setDisable(false)                      
            }       
        }
    }
    const handleChange=()=>{
        setMessage("")
        setStatus(true)
    }
    return(
        <>
            <Head>
                <title>Brightlife</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <div className="sign-bg">
                <img src="/img/signin-bg.jpg" alt="" className="bg" />
            </div>
            <div className="sign-container">
            <a href="/"> <div className="sign-logo"> <img src="/img/logo.png" alt="Bright Life" /></div></a>
            <div className="sign-in-block">
                <h3>Forgot Password</h3>
                <p>Enter email associated with your account</p>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"><img src="/img/email-icon.svg" className="lab-icon" />Email</label>
                    {/* <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter e-mail address" /> */}
                    <input className="form-control" name="email" type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter e-mail address" disabled={disable} onChange={handleChange}/>
                </div>
                <div className="text-center">
                    {status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}
                </div>
                <div className="continue-btn">
                    <button className="btn sign-btn" disabled={disable}>Continue</button>
                </div>
                </form>
            </div>
            </div>

            <Script src="js/jquery.slim.min.js"></Script>
            <Script src="js/popper.min.js"></Script>
            <Script src="js/bootstrap.bundle.min.js"></Script>
            <Script src="js/custom.js"></Script>
            {/* <h3 className="mb-4 pt-5 font-monospace text-center">bright life</h3>
            <div className="d-flex justify-content-center pb-5">
                <form className="bg-light px-5 pt-2" onSubmit={handleSubmit}>
                    <h1 className="h4 font-monospace text-center ">Forgot Password?</h1>
                    <h6 className="h6 text-center  mb-3 "><small>Enter email associated with your account</small></h6>
                    <div className="mb-3 col-xs-30 row">
                        <div>
                            <AiOutlineMail/>
                            <label className="mb-3"> Email</label>
                        </div>
                        <div>
                            <input className="form-control" name="email" type="email" placeholder="enter e-mail address" disabled={disable} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="text-center">
                        {status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}
                    </div>
                    <div className="text-center mb-4">
                        <button className="btn btn-success m-2 col-6" type="submit" disabled={disable}>continue</button>
                    </div>
                </form>
            </div> */}
        </>
    )
}