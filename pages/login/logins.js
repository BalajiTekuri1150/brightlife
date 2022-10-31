import {AiOutlineMail,AiOutlineLock,AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/router";
import { setLocalData } from "../../utils/storage_service";
import { postData } from "../../utils/data_manage_service"
import Footers from "../footers"
export default function Login()
{
    const router = useRouter();
    const [passwordShown, setPasswordShown] = useState(false)
    const [status,setStatus]=useState("")
    const [message,setMessage]=useState(true)
    const [disable,setDisable]=useState(false)
    const handleSubmit=async(e)=>
    { 
        e.preventDefault()
        setDisable(true)
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        if(data.email!="" && data.password!=""){
            const result=await(postData('https://test-api.brightlife.org/brightlife/signin',data))
            setStatus(result?.data?.status)
            if(result?.data?.status){
                setMessage("Login successful")
                setLocalData("token",result.data.token)
                setLocalData("user_id",result?.data?.response?.user?.id)
                if(result?.data?.response?.user?.role==="sponsor")
                {
                    router.push({ 
                        pathname: '/components/kids_Details',
                    })
                }
                else if(result?.data?.response?.user?.role==="child")
                {
                    router.push({ 
                        pathname: '/components/child_dashboard',
                    })  
                }
                else if(result?.data?.response?.user?.role==="gaurdian")
                {
                    router.push({ 
                        pathname: '/components/gaurdian_dashboard',
                    })   
                }
                else if(result?.data?.response?.user?.role==="admin"){
                    router.push({ 
                        pathname: '/components/admin_dashboard',
                    })  
                }
            }
            else{
                setDisable(false)
                if(result?.status==401){
                    setMessage(result?.data?.error?.message)
                }
                else{
                    setMessage(result?.data?.message)
                }
            }
        }
        else{
            setStatus(false)
            setMessage("Both the fields are mandatory")
            setDisable(false)
        }
    }
    const handlePassword = () => {
		setPasswordShown(!passwordShown);
	};
    const handleChange=()=>{
        setMessage("")
        setStatus(true)
    }
    return(
        <>
            {/* <div className="bg-image d-flex border justify-content-center p-5" style={{"backgroundImage":"url('/background_image.jpeg')","backgroundRepeat":"no-repeat","backgroundSize":"cover"}}> */}
                <div>
                    <h3 className="mb-4 pt-5 font-monospace text-center">bright life</h3>
                    <div className="d-flex justify-content-center pb-5">
                        <form className="bg-light px-4 pt-5" onSubmit={handleSubmit}>
                            <h1 className="h3 mb-2 font-monospace text-center ">Sign in</h1>
                                <h6 className="text-center mb-3 ">To Your brightlife account</h6>
                                <div className="mb-3 row">
                                    <div>
                                        <AiOutlineMail/>
                                        <label className="col"> Email</label>
                                    </div>
                                    <div>
                                        <input className="form-control" name="email" type="email" placeholder="enter e-mail address" disabled={disable} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div>
                                        <AiOutlineLock/>
                                        <label className="col-form-label"> Password</label>
                                    </div>
                                    <div className="d-flex position-relative ">
                                        <input className="form-control" name="password" placeholder="enter password" type={passwordShown ? "text" : "password"} disabled={disable} onChange={handleChange}/>
                                        <span className="position-absolute flex end-0 p-2 bottom-0 m-2" onClick={handlePassword}>{passwordShown? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}</span>
                                    </div>
                                </div>
                                <Link href="/login/forgotpsw">Forgot Password?</Link>
                                <div className="text-center">
                                    {status?<p className="text-success text-bold">{message}</p>:<p className="text-danger text-bold">{message}</p>}
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-success" type="submit" disabled={disable}>Sign in</button>
                                </div>
                                <p className="text-center">  ------------------OR------------------</p>
                                <div className="btn-toolbar pt-2">
                                    <div className="mr-4">
                                       <button type="button" className="btn mx-1 text-white" style={{"backgroundColor":"#3b5998"}}>Sign in with Facebook</button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-primary mx-1">Sign in with Google</button> 
                                    </div>
                                </div>
                                <br/>
                                <p className="text-center py-3">Not a member?<Link ClassName="text-primary" href="/">Sign UP</Link></p>
                        </form>
                    </div>
                </div>
                <Footers/>
            {/* </div> */}
        </>
    )
}