import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { useRouter } from 'next/router';
import { useState } from "react"
export default function Resetpsw()
{
    const router = useRouter()
    const user = router.query;
    const [passwordShown, setPasswordShown] = useState(false)
    const [status,setStatus]=useState("")
    const [message,setMessage]=useState(true)
    const [disable,setDisable]=useState(false)
    const handleSubmit=async(e)=>
    {
        e.preventDefault()
        if(e.target[0].value==e.target[1].value)
        {
            const data = {
                email:user.email,
                otp: user.otp,
                password:e.target[0].value
            }   
            fetch('https://test-api.brightlife.org/brightlife/update/password', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response)=>{
                response.json()
                .then((result)=>{
                    if(result.status)
                    { 
                        setStatus(result.status)
                        setMessage(result.response.message)
                        router.push({
                            pathname: '/login/pswsucess',
                        })
                    }
                    else{
                        setStatus(result.status)
                        setMessage(result.error.message.password)
                        setDisable(false)
                    }
                })        

            })
    }
    else{
        setStatus(false)
        setMessage("password didn't match")
    }
}
    const handlePassword = () => {
		setPasswordShown(!passwordShown);
	};
    return(
        <>
            <div>
                <h3 className="mb-4 pt-5 font-monospace text-center">bright life</h3>
                <div className="d-flex justify-content-center pb-5">
                    <form className="bg-light px-4 pt-5" onSubmit={handleSubmit}>
                        <h1 className="h3 mb-2 font-monospace text-center ">Reset Password</h1>
                            <h6 className="text-center mb-3 ">{user.email}</h6>
                            <div className="mb-3 row">
                                <div>
                                    <label className="col-form-label"> Password</label>
                                </div>
                                <div className="d-flex position-relative">
                                    <input className="form-control" name="password" placeholder="enter password" disabled={disable} type={passwordShown ? "text" : "password"}/>
                                    <span className="position-absolute flex end-0 p-2 bottom-0 m-2" onClick={handlePassword}>{passwordShown? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}</span>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div>
                                    <label className="col-form-label"> Reenter Password</label>
                                </div>
                                <div className="d-flex">
                                    <input className="form-control" name="repassword" placeholder="Re enter password"  type="password" disabled={disable}/>
                                </div>
                            </div>
                            <div className="text-center">
                                {status?<p className="text-success text-bold">{message}</p>:<p className="text-danger text-bold">{message}</p>}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success m-3" type="submit">Continue</button>
                            </div>
                    </form>
                </div>
            </div>
        </>
    )
}