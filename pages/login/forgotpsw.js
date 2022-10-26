import {AiOutlineMail} from "react-icons/ai";
import {useRouter} from "next/router";
import { useState } from "react";
export default function Forgotpsw()
{
    const router = useRouter();
    const [status,setStatus]=useState(true)
    const [message,setMessage]=useState("")
    const [disable,setDisable]=useState(false)
    const handleSubmit=async(e)=>
    {
        setDisable(true)
        e.preventDefault()
        if(e.target.email.value==""){
            setStatus(false)
            setMessage("Emails must be required")  
            setDisable(false) 
        }
        else{
            const data = {
                email: e.target.email.value,
                context:"forgot_password"
            }
            fetch('https://test-api.brightlife.org/brightlife/v2/get/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then((response)=>{
                response.json()
                .then((result)=>{
                    if(result.status){
                        setStatus(result.status)
                        setMessage(result.response.message) 
                        router.push({ 
                            pathname: '/login/enterotp',
                            query: { email:e.target.email.value,context:data.context,refid:result.response.referrence_id}
                        })
                    }
                    else{
                            setStatus(result.status)
                            setMessage(result.error.message)  
                            setDisable(false)                      
                    }
                })          
            })
        }
    }
    return(
        <>
                <div>
                    <h3 className="mb-4 pt-5 font-monospace text-center">bright life</h3>
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
                                        <input className="form-control" name="email" type="email" placeholder="enter e-mail address" disabled={disable}/>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {status?<p></p>:<p className="text-danger">{message}</p>}
                                </div>
                                <div className="text-center mb-4">
                                    <button className="btn btn-success m-2 col-6" type="submit" disabled={disable}>continue</button>
                                </div>
                        </form>
                    </div>
                </div>
        </>
    )
}