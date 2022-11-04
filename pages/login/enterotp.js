import {AiOutlineMail} from "react-icons/ai";
import { useRouter } from 'next/router'
import { useState,useEffect,useRef } from "react";
import { postData } from "../../utils/data_manage_service";
export default function Enterotp()
{
    const router = useRouter();
    const otp1Ref=useRef("")
    const otp2Ref=useRef("")
    const otp3Ref=useRef("")
    const otp4Ref=useRef("")
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
            const data = {
                email:user.email,
                context:user.context,
                otp:parseInt(total)
            }   
            const result=await(postData('https://test-api.brightlife.org/brightlife/v2/verify/otp',data))
            setStatus(result?.data?.status)
            if(result?.data?.status){ 
                setColor({"border":"1px solid green"})
                setMessage(result.data.response.message)
                router.push({
                    pathname: '/login/resetpsw',
                    query: { email:user.email,otp:total },
                })
            }
            else{
                setMessage(result.data.error.message)
                setColor({"border":"1px solid red"})
                setDisable(false)
            }  
        }
    }
    const resendOTP=async()=>
    {
        const data ={
            referrence_id:user.refid
        } 
        const result=await(postData('https://test-api.brightlife.org/brightlife/v2/resend/otp',data))
        setStatus(result.data.status)
        setDisable(false)
        if(result?.data?.status){         
            setMessage(result?.data?.response?.message)    
        }
        else{
            setMessage(result?.data?.error?.message)
        }        
    }
    const handleChange=(e)=>{
        setMessage("")
        setStatus(true)
        const{name ,value}=e.target;
        setFormValues({...formValues,[name]:value});
        if(e.target.name==="otp1" && e.target.value.length==1){
            otp2Ref.current.focus()
        }
        else if(e.target.name==="otp2" && e.target.value.length==1){
            otp3Ref.current.focus()
        }
        else if(e.target.name==="otp3"&& e.target.value.length==1){
            otp4Ref.current.focus()
        }
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
                            <input type="number" name="otp1" onChange={handleChange} ref={otp1Ref} style={color} className="col-1 mx-1 " />
                            <input type="number" name="otp2" onChange={handleChange} ref={otp2Ref} style={color} className="col-1 mx-1 " />
                            <input type="number" name="otp3" onChange={handleChange} ref={otp3Ref} style={color} className="col-1 mx-1 " />
                            <input type="number" name="otp4" onChange={handleChange} ref={otp4Ref} style={color} className="col-1 mx-1 " />                            
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