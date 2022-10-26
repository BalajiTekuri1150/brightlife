import {AiOutlineMail,AiOutlineLock,AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/router";
export default function Login()
{
    const router = useRouter();
    const [passwordShown, setPasswordShown] = useState(false)
    const [status,setStatus]=useState("")
    const [message,setMessage]=useState(true)
    const [disable,setDisable]=useState(false)
    const handleSubmit=async(e)=>
    {
        setDisable(true)
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        const JSONdata = JSON.stringify(data)
        fetch('https://test-api.brightlife.org/brightlife/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        })
        .then((response) => {
            response.json()
                .then((result)=>{
                    if(result.status){ 
                        setStatus(result.status)
                        setMessage("Login sucessful")
                        console.log(result.token)
                        router.push({ 
                            pathname: '/aplication',
                            query: {token:result.token}
                        })
                        
                    }
                    else{
                        if(response.status==401){
                            setStatus(result.status)
                            setMessage(result.error.message)
                            setDisable(false)
                        }
                        else if(response.status==400)
                        {
                            setStatus(result.status)
                            setMessage("Both the fields are mandatory")
                            setDisable(false)
                        }
                        else{
                            setStatus(result.status)
                            setMessage(result.message)
                            setDisable(false)
                        }
                    }
                })               
            })
    }
    const handlePassword = () => {
		setPasswordShown(!passwordShown);
	};
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
                                        <input className="form-control" name="email" type="email" placeholder="enter e-mail address" disabled={disable}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div>
                                        <AiOutlineLock/>
                                        <label className="col-form-label"> Password</label>
                                    </div>
                                    <div className="d-flex position-relative ">
                                        <input className="form-control" name="password" placeholder="enter password" type={passwordShown ? "text" : "password"} disabled={disable}/>
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
            {/* </div> */}
        </>
    )
}