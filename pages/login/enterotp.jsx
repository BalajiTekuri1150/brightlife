import {AiOutlineMail} from "react-icons/ai";
import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import { postData } from "../../utils/data_manage_service";
export default function Enterotp()
{
    const router = useRouter();
    const user = router.query;
    const [color,setColor]=useState({"border":"1px solid "})
    const [timeLeft, setTimeLeft] = useState(30);
    const [status,setStatus]=useState("")
    const [message,setMessage]=useState(true)
    const [disable,setDisable]=useState(false)
    const initialValues={otp1:"",otp2:"",otp3:"",otp4:""};
	const [formValues,setFormValues]=useState(initialValues);
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
        e.preventDefault()
        setDisable(true)
        const value=Object.values(formValues)
        let total=""
        for (let i in value){
            total=total+value[i]
        }
        if(total.length!=4){
            setMessage("Enter correct otp")
            setStatus(false)
            setDisable(false)
        }
        else{
            total=parseInt(total)
            const data = {
                email:user.email,
                context:user.context,
                otp: total
            }   
            const JSONdata = JSON.stringify(data)
            postData('https://test-api.brightlife.org/brightlife/v2/verify/otp',JSONdata)
            .then((result)=>{
                if(result?.data?.status){ 
                    setColor({"border":"1px solid green"})
                    setStatus(result.data.status)
                    setMessage(result.data.response.message)
                    router.push({
                        pathname: '/login/resetpsw',
                        query: { email:user.email,otp:total },
                    })
                }
                else{
                    setStatus(result.data.status)
                    setMessage(result.data.error.message)
                    setColor({"border":"1px solid red"})
                    setDisable(false)
                }  
            })
        }
    }
    const resendOTP=()=>
    {
        const data ={
            referrence_id:user.refid
        } 
        const JSONdata=JSON.stringify(data)
        postData('https://test-api.brightlife.org/brightlife/v2/resend/otp',JSONdata)
        .then((result)=>{
                if(result?.data?.status){ 
                    setStatus(result.data.status)
                    setMessage(result.data.response.message)
                    setDisable(false)
                }
                else{
                    setStatus(result.data.status)
                    setMessage(result.data.error.message)
                    setDisable(false)
                }
            })        
    }
    const handleChange=(e)=>{
        setMessage("")
        setStatus(true)
        const{name ,value}=e.target;
        setFormValues({...formValues,[name]:value});
    }
    return(
        <>
            <div>
                <h3 className="mb-4 pt-5 font-monospace text-center">bright life</h3>
                <div className="d-flex justify-content-center ">
                    <form className="bg-light col-4 pt-2 text-center" onSubmit={handleSubmit}>
                        <h1 className="h4 font-monospace text-center ">Enter OTP</h1>
                        <h6 className="h6 text-center  mb-3 "><small><AiOutlineMail/>Enter OTP sent to {user.email}</small></h6>
                        <div className="mt-2">
                            <input type="number" name="otp1" onChange={handleChange} style={color} className="col-1 mx-1 " maxLength="1" disabled={disable}/>
                            <input type="number" name="otp2" onChange={handleChange} style={color} className="col-1 mx-1 " min="0" max="9" disabled={disable}/>
                            <input type="number" name="otp3" onChange={handleChange} style={color} className="col-1 mx-1 " min="0" max="9" disabled={disable}/>
                            <input type="number" name="otp4" onChange={handleChange} style={color} className="col-1 mx-1 " min="0" max="9" disabled={disable}/>                            
                        </div>
                        <div className="text-center m-2">
                            {status?<p className="text-success">{message}</p>:<p className="text-danger">{message}</p>}
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success m-2 col-4" type="submit"disabled={disable} >Continue</button>
                        </div>
                        <div className="content d-flex justify-content-center mb-4"> Didn't received OTP?
                            {timeLeft==0?<p className="text-primary text-decoration-underline pe-auto" onClick={resendOTP}><a href="#">Resend OTP</a></p>:<p className="text-decoration-underline pe-none"> Resend OTP in {timeLeft}</p>} 
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}