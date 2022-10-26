import {AiOutlineMail} from "react-icons/ai";
import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
export default function Enterotp()
{
    const router = useRouter();
    const user = router.query;
    const [timeLeft, setTimeLeft] = useState(30);
    const [status,setStatus]=useState("")
    const [message,setMessage]=useState(true)
    const [disable,setDisable]=useState(false)
    useEffect(() => {
        if(timeLeft!=0){
        const interval = setInterval(() => {
          setTimeLeft((prevtimeLeft) => prevtimeLeft-1);
        }, 1000);
        return () => clearInterval(interval);
    }
      }, [timeLeft]);
    
    const handleSubmit=async(e)=>
    {
        setDisable(true)
        e.preventDefault()
        if(e.target.otp.value==""){
            setStatus(false)
            setMessage("This field may not be Blank")
            setDisable(false)
        }
        else{
            const data = {
                email:user.email,
                context:user.context,
                otp: e.target.otp.value
            }   
            const JSONdata = JSON.stringify(data)
            fetch('https://test-api.brightlife.org/brightlife/v2/verify/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            })
            .then((response)=>{
                response.json()
                .then((result)=>{
                    if(result.status){ 
                        setStatus(result.status)
                        setMessage(result.response.message)
                        router.push({
                            pathname: '/login/resetpsw',
                            query: { email:user.email,otp:data.otp },
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
    const handleCLick=()=>
    {
        const data ={
            referrenceid:user.refid
        } 
        fetch('https://test-api.brightlife.org/brightlife/v2/resend/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response)=>{
            response.json()
            .then((result)=>{
                if(result.status){ 
                    setStatus(result.status)
                    setMessage(result.response.message)
                    setDisable(false)
                }
                else{
                    setStatus(result.status)
                    setMessage(result.error.message)
                    setDisable(false)
                }
            })        
        })
    }
    return(
        <>
            <div>
                <h3 className="mb-4 pt-5 font-monospace text-center">bright life</h3>
                <div className="d-flex justify-content-center ">
                    <form className="bg-light px-5 pt-2" onSubmit={handleSubmit}>
                        <h1 className="h4 font-monospace text-center ">Enter OTP</h1>
                        <h6 className="h6 text-center  mb-3 "><small><AiOutlineMail/>Enter OTP sent to {user.email}</small></h6>
                        <div className="mt-2">
                            <input className="text-center form-control" name='otp' disabled={disable}/>                             
                        </div>
                        <div className="text-center m-2">
                            {status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success m-2 col-6" type="submit" disabled={disable}>Continue</button>
                        </div>
                        <div className="content d-flex justify-content-center mb-4"> Didn't received OTP?
                            {timeLeft==0?<p className="text-primary text-decoration-underline pe-pointer" onClick={handleCLick}> Resend OTP</p>:<p className="text-decoration-underline pe-none"> Resend OTP in {timeLeft}</p>} 
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}